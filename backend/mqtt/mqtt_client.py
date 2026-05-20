# =========================================================
#
# Intelligent Embedded Diagnostic System (IEDS)
# MQTT Telemetry Client
#
# File: mqtt_client.py
#
# Description:
# Handles MQTT telemetry ingestion for the
# Intelligent Embedded Diagnostic System.
#
# Features:
# - MQTT broker connection
# - Telemetry topic subscription
# - Real-time telemetry reception
# - SQLite telemetry persistence
# - WebSocket telemetry broadcasting
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

MQTT_TOPIC = "ieds/telemetry"


# =========================================================
# MQTT CONNECTION CALLBACK
# =========================================================
#
# Triggered when MQTT client successfully
# connects to the broker.
#
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
#
# Triggered when telemetry is received
# from MQTT broker.
#
# Responsibilities:
# - Decode telemetry payload
# - Persist telemetry to SQLite
# - Broadcast telemetry to WebSocket clients
#
# =========================================================

def on_message(
    client,
    userdata,
    msg
):

    try:

        # =============================================
        # DECODE PAYLOAD
        # =============================================

        payload = json.loads(
            msg.payload.decode()
        )

        print(
            "MQTT telemetry received:",
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

        print(
            "Telemetry persisted to SQLite."
        )


        # =============================================
        # WEBSOCKET BROADCAST
        # =============================================

        asyncio.run(
            manager.broadcast(payload)
        )

        print(
            "Telemetry broadcasted to WebSocket clients."
        )

    except Exception as error:

        print(
            "MQTT message processing error:",
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
#
# Initializes MQTT connection.
#
# Fault tolerant:
# Backend continues running even if
# MQTT broker unavailable.
#
# Useful for:
# - CI/CD
# - GitHub Actions
# - deployment environments
# - development without broker
#
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