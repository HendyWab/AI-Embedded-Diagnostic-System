# =========================================================
#
# Intelligent Embedded Diagnostic System (IEDS)
# Author: HendyWab
#
# WebSocket Telemetry Route
#
# =========================================================


# =========================================================
# IMPORTS
# =========================================================

import asyncio
import json

from fastapi import (
    APIRouter,
    WebSocket
)

import backend.mqtt.mqtt_client as mqtt_client

# =========================================================
# ROUTER INITIALIZATION
# =========================================================

router = APIRouter()


# =========================================================
# TELEMETRY WEBSOCKET
# =========================================================

@router.websocket("/ws/telemetry")
async def telemetry_websocket(
    websocket: WebSocket
):

    await websocket.accept()

    print(
        "WebSocket client connected"
    )

    try:

        while True:

            if mqtt_client.latest_telemetry:

                websocket_payload = {

                    **mqtt_client.latest_telemetry,

                    "online_devices":
                    len(mqtt_client.get_online_devices()),

                    "offline_devices":
                    len(mqtt_client.get_offline_devices()),

                    "fleet_health":
                    mqtt_client.get_fleet_health(),

                    "online_device_list":
                    mqtt_client.get_online_devices(),

                    "offline_device_list":
                    mqtt_client.get_offline_devices()
                }
                print(
                    "ONLINE:",
                    mqtt_client.get_online_devices()
                )

                print(
                    "OFFLINE:",
                    mqtt_client.get_offline_devices()
                )

                print(
                    "FLEET:",
                    mqtt_client.get_fleet_health()
                )
                print(
                    "WEBSOCKET PAYLOAD:",
                    websocket_payload
                )
                print(
                "WEBSOCKET PAYLOAD:",
                json.dumps(
                    websocket_payload,
                    indent=2
                )
)
                await websocket.send_text(
                    json.dumps(
                        websocket_payload
                    )
                )

            await asyncio.sleep(2)

    except Exception as error:

        print(
            "WebSocket disconnected"
        )

        print(error)