"""
===========================================================
AI ROUTES
IEDS - Intelligent Embedded Diagnostic System
===========================================================

AI diagnostics API routes.

Author: HendyWab
===========================================================
"""

from fastapi import APIRouter

from pydantic import BaseModel

from backend.ai_engine.inference import AIInferenceEngine

from backend.services.device_registry import DeviceRegistry


# ===========================================================
# ROUTER INITIALIZATION
# ===========================================================

router = APIRouter()


# ===========================================================
# AI ENGINE INSTANCE
# ===========================================================

ai_engine = AIInferenceEngine()


# ===========================================================
# DEVICE REGISTRY INSTANCE
# ===========================================================

registry = DeviceRegistry()


# ===========================================================
# REQUEST MODEL
# ===========================================================

class SignalRequest(BaseModel):

    device_id: str

    signal: list[float]


# ===========================================================
# ANALYZE SIGNAL
# ===========================================================

@router.post("/analyze")

def analyze_signal(payload: SignalRequest):

    """
    Analyze telemetry signal using
    IEDS AI diagnostics engine.
    """

    # =======================================================
    # RUN AI ANALYSIS
    # =======================================================

    result = ai_engine.analyze_signal(
        payload.signal
    )

    # =======================================================
    # REGISTER DEVICE STATE
    # =======================================================

    registry.update_device(
        payload.device_id,
        result
    )

    # =======================================================
    # RETURN STRUCTURED RESPONSE
    # =======================================================

    return {

        "device_id": payload.device_id,

        "diagnostics": result
    }


# ===========================================================
# GET ALL REGISTERED DEVICES
# ===========================================================

@router.get("/devices")

def get_devices():

    """
    Return all monitored devices.
    """

    return {

        "registered_devices":
            registry.get_all_devices()
    }


# ===========================================================
# GET SINGLE DEVICE
# ===========================================================

@router.get("/devices/{device_id}")

def get_device(device_id: str):

    """
    Return specific device state.
    """

    device = registry.get_device(device_id)

    if not device:

        return {

            "error":
                "Device not found"
        }

    return device