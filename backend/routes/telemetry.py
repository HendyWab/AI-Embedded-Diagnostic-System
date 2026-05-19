# ==============================================================
#
#  Intelligent Embedded Diagnostic System (IEDS)
#  Telemetry Routes
#
#  File: telemetry.py
#
# ==============================================================

from fastapi import APIRouter

from backend.models.telemetry_model import TelemetryModel

# ==============================================================
#                      ROUTER INSTANCE
# ==============================================================

router = APIRouter()

# ==============================================================
#                      MOCK STORAGE
# ==============================================================

telemetry_storage = []

# ==============================================================
#                      TELEMETRY ENDPOINTS
# ==============================================================

@router.post("/")
async def ingest_telemetry(
    payload: TelemetryModel
):
    """
    Ingest telemetry payload from embedded device.
    """

    telemetry_storage.append(payload)

    return {
        "status": "telemetry_received",
        "device_id": payload.device_id
    }


@router.get("/latest")
async def get_latest_telemetry():
    """
    Returns latest telemetry payload.
    """

    if not telemetry_storage:
        return {
            "status": "no_telemetry_available"
        }

    return telemetry_storage[-1]
