from fastapi import APIRouter

from sqlalchemy.orm import Session

from backend.models.telemetry_model import (
    TelemetryModel
)

from backend.models.telemetry_db_model import (
    TelemetryRecord
)

from backend.database.db import (
    SessionLocal
)

from backend.services.websocket_manager import (
    manager
)

router = APIRouter()

# =========================================
# MEMORY BUFFER
# =========================================

latest_telemetry = None

telemetry_history = []

MAX_HISTORY = 50


# =========================================
# DATABASE SESSION
# =========================================

def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()


# =========================================
# RECEIVE TELEMETRY
# =========================================

@router.post("/telemetry")
async def receive_telemetry(
    telemetry: TelemetryModel
):

    global latest_telemetry

    latest_telemetry = telemetry

    telemetry_history.append(
        telemetry.dict()
    )

    if len(telemetry_history) > MAX_HISTORY:

        telemetry_history.pop(0)

    # =====================================
    # DATABASE STORAGE
    # =====================================

    db = SessionLocal()

    telemetry_record = TelemetryRecord(

        device_id=
        telemetry.device_id,

        anomaly_score=
        telemetry.anomaly_score,

        signal_quality=
        telemetry.signal_quality,

        emi_detected=
        telemetry.emi_detected,

        timestamp=
        telemetry.timestamp
    )

    db.add(
        telemetry_record
    )

    db.commit()

    db.close()

    # =====================================
    # WEBSOCKET BROADCAST
    # =====================================

    await manager.broadcast(
        telemetry.dict()
    )

    return {

        "status": "received",

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
# GET MEMORY HISTORY
# =========================================

@router.get("/telemetry/history")
async def get_telemetry_history():

    return telemetry_history


# =========================================
# GET DATABASE HISTORY
# =========================================

@router.get("/telemetry/database")
async def get_database_history():

    db = SessionLocal()

    records = db.query(
        TelemetryRecord
    ).all()

    db.close()

    return records


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