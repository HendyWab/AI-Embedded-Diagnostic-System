"""
===========================================================
AI ANALYSIS ROUTES
IEDS - Intelligent Embedded Diagnostic System
===========================================================

FastAPI routes for AI telemetry diagnostics.

Author: HendyWab
===========================================================
"""

from fastapi import APIRouter
from pydantic import BaseModel

from backend.ai_engine.inference import AIInferenceEngine

# ===========================================================
# ROUTER INITIALIZATION
# ===========================================================

router = APIRouter()

# ===========================================================
# AI ENGINE INSTANCE
# ===========================================================

ai_engine = AIInferenceEngine()

# ===========================================================
# REQUEST MODEL
# ===========================================================

class SignalRequest(BaseModel):

    signal: list[float]

# ===========================================================
# AI ANALYSIS ENDPOINT
# ===========================================================

@router.post("/analyze")
async def analyze_signal(request: SignalRequest):

    """
    Analyze telemetry signal using
    the IEDS AI diagnostics engine.
    """

    result = ai_engine.analyze_signal(request.signal)

    return result