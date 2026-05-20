import json

import random

import time

from datetime import datetime

import paho.mqtt.client as mqtt

MQTT_BROKER = "localhost"

MQTT_PORT = 1883

MQTT_TOPIC = "ieds/telemetry"

client = mqtt.Client()

client.connect(
    MQTT_BROKER,
    MQTT_PORT,
    60
)

print(
    "Telemetry simulator started..."
)

while True:

    anomaly_score = round(
        random.uniform(0.0, 1.0),
        2
    )

    signal_quality = round(
        random.uniform(75.0, 99.0),
        2
    )

    emi_detected = (
        anomaly_score > 0.7
    )

    telemetry = {

        "device_id":
        "IEDS-001",

        "anomaly_score":
        anomaly_score,

        "signal_quality":
        signal_quality,

        "emi_detected":
        emi_detected,

        "timestamp":
        datetime.now().isoformat()
    }

    client.publish(
        MQTT_TOPIC,
        json.dumps(telemetry)
    )

    print(
        "Published:",
        telemetry
    )

    time.sleep(3)