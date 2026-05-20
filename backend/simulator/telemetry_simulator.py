# =========================================================
#
# Intelligent Embedded Diagnostic System (IEDS)
# Multi-Device Telemetry Simulator
#
# File: telemetry_simulator.py
#
# Description:
# Simulates multiple embedded telemetry devices
# publishing telemetry data through MQTT.
#
# Features:
# - Multi-device telemetry simulation
# - Randomized telemetry generation
# - MQTT telemetry publishing
# - EMI anomaly simulation
# - Real-time telemetry streaming
#
# =========================================================


# =========================================================
# IMPORTS
# =========================================================

import json

import time

import random

from datetime import datetime

import paho.mqtt.client as mqtt


# =========================================================
# MQTT CONFIGURATION
# =========================================================

MQTT_BROKER = "localhost"

MQTT_PORT = 1883


# =========================================================
# SIMULATED DEVICES
# =========================================================

DEVICES = [
    "ESP32-001",
    "ESP32-002",
    "STM32-001",
    "PIC-001"
]


# =========================================================
# MQTT CLIENT INITIALIZATION
# =========================================================

client = mqtt.Client()

client.connect(
    MQTT_BROKER,
    MQTT_PORT,
    60
)


# =========================================================
# GENERATE TELEMETRY PAYLOAD
# =========================================================

def generate_payload(
    device_id
):

    anomaly_score = round(
        random.uniform(0.1, 0.95),
        2
    )

    signal_quality = round(
        random.uniform(75, 100),
        2
    )

    emi_detected = (
        anomaly_score > 0.70
    )

    return {

        "device_id":
        device_id,

        "firmware_version":
        "v0.2.0",

        "anomaly_score":
        anomaly_score,

        "signal_quality":
        signal_quality,

        "emi_detected":
        emi_detected,

        "timestamp":
        datetime.utcnow().isoformat()
    }


# =========================================================
# MAIN TELEMETRY LOOP
# =========================================================

print(
    "Starting multi-device telemetry simulator..."
)

while True:

    for device_id in DEVICES:

        payload = generate_payload(
            device_id
        )

        topic = (
            f"ieds/devices/"
            f"{device_id}/telemetry"
        )

        client.publish(
            topic,
            json.dumps(payload)
        )

        print(
            f"[{device_id}] Published:",
            payload
        )

    time.sleep(3)