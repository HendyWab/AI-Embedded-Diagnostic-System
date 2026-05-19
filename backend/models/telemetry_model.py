# ==============================================================
#
#  Intelligent Embedded Diagnostic System (IEDS)
#  Telemetry Data Model
#
#  File: telemetry_model.py
#
# ==============================================================

from pydantic import BaseModel
from typing import List

# ==============================================================
#                      TOP-K PREDICTION
# ==============================================================

class TopKPrediction(BaseModel):

    fault_class: str

    confidence: float

# ==============================================================
#                      TELEMETRY MODEL
# ==============================================================

class TelemetryModel(BaseModel):

    timestamp: int

    device_id: str

    firmware_version: str

    anomaly_score: float

    signal_quality: float

    emi_detected: bool

    topk_predictions: List[TopKPrediction]
