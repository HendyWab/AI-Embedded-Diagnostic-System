# =========================================================
#
# Intelligent Embedded Diagnostic System (IEDS)
# Backend Core Application
#
# Author: HendyWab
#
# =========================================================

from fastapi import FastAPI

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

from backend.routes.websocket import (
    router as websocket_router
)

from backend.mqtt.mqtt_client import (
    start_mqtt
)

from backend.database.db import (
    engine
)

from backend.models.telemetry_db_model import (
    Base
)
from backend.routes.analytics_routes import (
    router as analytics_router
)

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

app.include_router(
    websocket_router
)
app.include_router(
    analytics_router
)

# =========================================================
# APPLICATION STARTUP
# =========================================================

@app.on_event("startup")
async def startup_event():

    # =====================================
    # DATABASE INITIALIZATION
    # =====================================

    Base.metadata.create_all(
        bind=engine
    )

    # =====================================
    # MQTT INITIALIZATION
    # =====================================

    start_mqtt()

    print(
        "--------------------------------"
    )

    print(
        "IEDS Backend Started"
    )

    print(
        "Database initialized"
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