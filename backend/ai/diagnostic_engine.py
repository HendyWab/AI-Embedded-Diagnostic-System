"""
===========================================
MAIN AI DIAGNOSTIC ENGINE
===========================================

Central intelligence layer responsible for:
- Anomaly classification
- Health evaluation
- AI recommendations
- Embedded diagnostics analysis

Author: Nangndi Wabede
Project: Intelligent Embedded Diagnostic System
"""

# =========================================
# IMPORT AI SUBMODULES
# =========================================

from ai.anomaly_detector import calculate_anomaly_level
from ai.health_classifier import classify_health
from ai.recommendation_engine import generate_recommendation


# =========================================
# MAIN DIAGNOSTIC PIPELINE
# =========================================

def run_diagnostics(telemetry_data: dict):
    """
    Execute complete AI diagnostic analysis.

    Parameters:
    -----------
    telemetry_data : dict
        Incoming telemetry payload

    Returns:
    --------
    dict
        AI diagnostic results
    """

    # =====================================
    # EXTRACT TELEMETRY PARAMETERS
    # =====================================

    anomaly_score = telemetry_data.get(
        "anomaly_score", 0
    )

    signal_quality = telemetry_data.get(
        "signal_quality", 0
    )

    emi_detected = telemetry_data.get(
        "emi_detected", False
    )

    # =====================================
    # RUN AI ANALYSIS
    # =====================================

    anomaly_level = calculate_anomaly_level(
        anomaly_score
    )

    health_status = classify_health(
        signal_quality,
        emi_detected
    )

    recommendation = generate_recommendation(
        anomaly_level,
        emi_detected,
        signal_quality
    )

    # =====================================
    # RETURN AI DIAGNOSTICS
    # =====================================

    return {

        "device_id": telemetry_data.get(
            "device_id"
        ),

        "health_status": health_status,

        "anomaly_level": anomaly_level,

        "recommendation": recommendation,
    }