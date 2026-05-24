"""
===========================================================
AI API ROUTES
IEDS - Intelligent Embedded Diagnostic System
===========================================================

Provides:
    - AI telemetry analysis
    - signal diagnostics
    - health scoring

Author: HendyWab
===========================================================
"""

from fastapi import APIRouter
from backend.ai_engine.inference import AIInferenceEngine

router = APIRouter()

ai_engine = AIInferenceEngine()


# ===========================================================
# AI SIGNAL ANALYSIS ENDPOINT
# ===========================================================
@router.post("/ai/analyze")

async def analyze_signal(payload: dict):

    """
    Example Request:

    {
        "signal": [75, 80, 92, 100, 45, 30]
    }
    """

    signal = payload.get("signal", [])

    result = ai_engine.analyze_signal(signal)

    return result
