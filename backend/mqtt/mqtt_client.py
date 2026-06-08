# =========================================================
#
# Intelligent Embedded Diagnostic System (IEDS)
# Multi-Device MQTT Telemetry Client
#
# Author: HendyWab
#
# Description:
# Handles distributed telemetry ingestion
# from multiple embedded devices.
#
# Features:
# - Wildcard MQTT subscriptions
# - Multi-device telemetry ingestion
# - SQLite persistence
# - Real-time WebSocket broadcasting
# - Device registry support
# - Device heartbeat monitoring
# - Fleet health monitoring
# - Fault-tolerant MQTT initialization
#
# =========================================================


# =========================================================
# IMPORTS
# =========================================================

import json
import asyncio

from datetime import datetime

import paho.mqtt.client as mqtt

from backend.database.db import (
    SessionLocal
)

from backend.models.telemetry_db_model import (
    TelemetryRecord
)

from backend.services.websocket_manager import (
    manager
)


# =========================================================
# MQTT CONFIGURATION
# =========================================================

MQTT_BROKER = "localhost"

MQTT_PORT = 1883

MQTT_TOPIC = "ieds/devices/+/telemetry"


# =========================================================
# GLOBAL TELEMETRY STATE
# =========================================================

active_devices = set()

latest_telemetry = {}

# =========================================================
# DEVICE MONITORING
# =========================================================

device_last_seen = {}

OFFLINE_TIMEOUT_SECONDS = 30


# =========================================================
# DEVICE STATUS HELPERS
# =========================================================

def get_online_devices():

    now = datetime.utcnow()

    return [

        device

        for device, last_seen

        in device_last_seen.items()

        if (
            now - last_seen
        ).total_seconds()

        < OFFLINE_TIMEOUT_SECONDS
    ]


def get_offline_devices():

    now = datetime.utcnow()

    return [

        device

        for device, last_seen

        in device_last_seen.items()

        if (
            now - last_seen
        ).total_seconds()

        >= OFFLINE_TIMEOUT_SECONDS
    ]


def get_fleet_health():

    total = len(
        device_last_seen
    )

    if total == 0:

        return 100

    online = len(
        get_online_devices()
    )

    return round(
        (online / total) * 100,
        1
    )


# =========================================================
# MQTT CONNECT CALLBACK
# =========================================================

def on_connect(
    client,
    userdata,
    flags,
    rc
):

    print(
        "MQTT connected with code:",
        rc
    )

    client.subscribe(
        MQTT_TOPIC
    )

    print(
        f"Subscribed to topic: {MQTT_TOPIC}"
    )


# =========================================================
# MQTT MESSAGE CALLBACK
# =========================================================

def on_message(
    client,
    userdata,
    msg
):

    global latest_telemetry

    try:

        payload = json.loads(
            msg.payload.decode()
        )

        device_id = payload[
            "device_id"
        ]

        active_devices.add(
            device_id
        )

        # =================================================
        # HEARTBEAT UPDATE
        # =================================================

        device_last_seen[
            device_id
        ] = datetime.utcnow()

        latest_telemetry = payload

        print(
            f"[{device_id}] MQTT telemetry received:",
            payload
        )

        # =================================================
        # WEBSOCKET PAYLOAD
        # =================================================

        websocket_payload = {

            **payload,

            "registered_devices":
            len(active_devices),

            "online_devices":
            len(
                get_online_devices()
            ),

            "offline_devices":
            len(
                get_offline_devices()
            ),

            "fleet_health":
            get_fleet_health(),

            "online_device_list":
            get_online_devices(),

            "offline_device_list":
            get_offline_devices()
        }

        # =================================================
        # DATABASE STORAGE
        # =================================================

        try:

            db = SessionLocal()

            telemetry_record = TelemetryRecord(

                device_id=
                payload["device_id"],

                anomaly_score=
                payload["anomaly_score"],

                signal_quality=
                payload["signal_quality"],

                emi_detected=
                payload["emi_detected"],

                timestamp=
                payload["timestamp"]
            )

            db.add(
                telemetry_record
            )

            db.commit()

            db.close()

        except Exception as db_error:

            print(
                "Database storage failed:",
                db_error
            )

        # =================================================
        # DEBUG TELEMETRY STATUS
        # =================================================

        print(
            "ONLINE DEVICES:",
            get_online_devices()
        )

        print(
            "OFFLINE DEVICES:",
            get_offline_devices()
        )

        print(
            "FLEET HEALTH:",
            get_fleet_health()
        )

        print(
            "WEBSOCKET PAYLOAD:",
            websocket_payload
        )

        # =================================================
        # WEBSOCKET BROADCAST
        # =================================================

        try:

            asyncio.run(
                manager.broadcast(
                    websocket_payload
                )
            )

        except Exception as websocket_error:

            print(
                "WebSocket broadcast failed:",
                websocket_error
            )

    except Exception as error:

        print(
            "MQTT processing error:",
            error
        )

# =========================================================
# MQTT CLIENT INITIALIZATION
# =========================================================

client = mqtt.Client()

client.on_connect = on_connect

client.on_message = on_message


# =========================================================
# START MQTT CLIENT
# =========================================================

def start_mqtt():

    try:

        client.connect(
            MQTT_BROKER,
            MQTT_PORT,
            60
        )

        client.loop_start()

        print(
            "MQTT broker connected successfully."
        )

    except Exception as error:

        print(
            "MQTT broker unavailable:",
            error
        )

        print(
            "Backend continuing without MQTT."
        )