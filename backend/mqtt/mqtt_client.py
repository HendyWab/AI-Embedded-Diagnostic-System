import json

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

MQTT_BROKER = "localhost"

MQTT_PORT = 1883

MQTT_TOPIC = "ieds/telemetry"


# =========================================
# ON CONNECT
# =========================================

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


# =========================================
# ON MESSAGE
# =========================================

def on_message(
    client,
    userdata,
    msg
):

    payload = json.loads(
        msg.payload.decode()
    )

    print(
        "MQTT telemetry received:",
        payload
    )

    # =====================================
    # DATABASE STORAGE
    # =====================================

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

    # =====================================
    # WEBSOCKET BROADCAST
    # =====================================

    import asyncio

    asyncio.run(
        manager.broadcast(payload)
    )


# =========================================
# MQTT CLIENT
# =========================================

client = mqtt.Client()

client.on_connect = on_connect

client.on_message = on_message


# =========================================
# START MQTT
# =========================================

def start_mqtt():

    client.connect(
        MQTT_BROKER,
        MQTT_PORT,
        60
    )

    client.loop_start()