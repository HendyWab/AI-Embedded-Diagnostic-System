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

from backend.mqtt.mqtt_client import (
    latest_telemetry
)


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

            if latest_telemetry:

                await websocket.send_text(
                    json.dumps(
                        latest_telemetry
                    )
                )

            await asyncio.sleep(2)

    except Exception as error:

        print(
            "WebSocket disconnected"
        )

        print(error)