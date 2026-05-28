# =========================================================
#
# Intelligent Embedded Diagnostic System (IEDS)
# Backend Core Application
#
# Author: HendyWab
#
# Description:
# Main FastAPI backend entry point
# for distributed telemetry diagnostics.
#
# Features:
# - REST API routes
# - WebSocket telemetry streaming
# - MQTT infrastructure startup
# - Historical telemetry retrieval
# - Real-time observability
# - Multi-device diagnostics
#
# =========================================================


# =========================================================
# IMPORTS
# =========================================================

import json

import asyncio

from fastapi import (
    FastAPI,
    WebSocket
)

from fastapi.middleware.cors import (
    CORSMiddleware
)

from backend.routes.ai_routes import (
    router as ai_router
)

from backend.routes.device_routes import (
    router as device_router
)

from backend.routes.history_routes import (
    router as history_router
)

from backend.mqtt.mqtt_client import (
    start_mqtt
)

import backend.mqtt.mqtt_client as mqtt_client


# =========================================================
# FASTAPI INITIALIZATION
# =========================================================

app = FastAPI(

    title=
    "IEDS Backend API",

    version=
    "0.5.0"
)


# =========================================================
# CORS CONFIGURATION
# =========================================================

app.add_middleware(

    CORSMiddleware,

    allow_origins=
    ["*"],

    allow_credentials=
    True,

    allow_methods=
    ["*"],

    allow_headers=
    ["*"]
)


# =========================================================
# ROUTE REGISTRATION
# =========================================================

app.include_router(
    ai_router
)

app.include_router(
    device_router
)

app.include_router(
    history_router
)


# =========================================================
# APPLICATION STARTUP
# =========================================================

@app.on_event("startup")
async def startup_event():

    start_mqtt()

    print(
        "--------------------------------"
    )

    print(
        "IEDS Backend Started"
    )

    print(
        "MQTT infrastructure active"
    )

    print(
        "AI diagnostics operational"
    )

    print(
        "WebSocket streaming enabled"
    )

    print(
        "Historical telemetry enabled"
    )

    print(
        "--------------------------------"
    )


# =========================================================
# ROOT ENDPOINT
# =========================================================

@app.get("/")
def root():

    return {

        "message":
        "IEDS Backend Running"
    }


# =========================================================
# WEBSOCKET TELEMETRY STREAM
# =========================================================

@app.websocket("/ws/telemetry")
async def websocket_telemetry(
    websocket: WebSocket
):

    await websocket.accept()

    print(
        "WebSocket client connected"
    )

    try:

        while True:

            if mqtt_client.latest_telemetry:

                await websocket.send_text(

                    json.dumps(

                        mqtt_client.latest_telemetry
                    )
                )

            await asyncio.sleep(1)

    except Exception as error:

        print(
            "WebSocket disconnected"
        )

        print(error)