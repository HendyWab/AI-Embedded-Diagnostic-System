from fastapi import APIRouter

from backend.models.telemetry_model import (
    TelemetryModel
)

from backend.services.websocket_manager import (
    manager
)

router = APIRouter()

# =========================================
# MEMORY STORAGE
# =========================================

latest_telemetry = None

telemetry_history = []

MAX_HISTORY = 50


# =========================================
# RECEIVE TELEMETRY
# =========================================

@router.post("/telemetry")
async def receive_telemetry(
    telemetry: TelemetryModel
):

    global latest_telemetry

    # -------------------------------------
    # STORE LATEST
    # -------------------------------------

    latest_telemetry = telemetry

    # -------------------------------------
    # STORE HISTORY
    # -------------------------------------

    telemetry_history.append(
        telemetry.dict()
    )

    # -------------------------------------
    # LIMIT BUFFER
    # -------------------------------------

    if len(telemetry_history) > MAX_HISTORY:

        telemetry_history.pop(0)

    # -------------------------------------
    # WEBSOCKET BROADCAST
    # -------------------------------------

    await manager.broadcast(
        telemetry.dict()
    )

    return {

        "status":
        "received",

        "device":
        telemetry.device_id

    }


# =========================================
# GET LATEST
# =========================================

@router.get("/telemetry/latest")
async def get_latest_telemetry():

    if latest_telemetry:

        return latest_telemetry.dict()

    return {

        "message":
        "No telemetry available"

    }


# =========================================
# GET HISTORY
# =========================================

@router.get("/telemetry/history")
async def get_telemetry_history():

    return telemetry_history


# =========================================
# DEVICE STATUS
# =========================================

@router.get("/device/status")
async def device_status():

    return {

        "registered_devices": 1,

        "backend_status": "operational",

        "websocket_status": "active",

        "telemetry_buffer":
        len(telemetry_history)

    }