# =========================================================
#
# Intelligent Embedded Diagnostic System (IEDS)
# Multi-Device MQTT Telemetry Client
#
# File: mqtt_client.py
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
# - Fault-tolerant MQTT initialization
#
# =========================================================


# =========================================================
# IMPORTS
# =========================================================

import json

import asyncio

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
# ACTIVE DEVICE REGISTRY
# =========================================================

active_devices = set()


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

        print(
            f"[{device_id}] MQTT telemetry received:",
            payload
        )


        # =============================================
        # DATABASE STORAGE
        # =============================================

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


        # =============================================
        # WEBSOCKET BROADCAST
        # =============================================

        websocket_payload = {

            **payload,

            "registered_devices":
            len(active_devices)
        }

        asyncio.run(
            manager.broadcast(
                websocket_payload
            )
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