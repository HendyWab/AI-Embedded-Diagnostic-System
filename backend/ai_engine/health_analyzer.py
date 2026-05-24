"""
===========================================
DEVICE HEALTH ANALYZER
===========================================

This module evaluates embedded device
health based on signal integrity,
telemetry stability, and EMI anomaly
conditions.

Author: HendyWab
Project: Intelligent Embedded Diagnostic System
"""

# =========================================
# DEVICE HEALTH CLASSIFICATION
# =========================================

def classify_health(
    signal_quality: float,
    emi_detected: bool,
    variance: float,
    stability_score: float
):
    """
    Analyze embedded system health state.

    Parameters:
    -----------
    signal_quality : float
        Signal quality percentage

    emi_detected : bool
        EMI anomaly detection flag

    variance : float
        Signal variance metric

    stability_score : float
        Signal stability evaluation

    Returns:
    --------
    dict
        Structured health analysis
    """

    # =====================================
    # DEFAULT RESPONSE
    # =====================================

    status = "GOOD"

    severity = "LOW"

    risk_level = "LOW"

    confidence = 0.75

    # =====================================
    # CRITICAL HEALTH CONDITION
    # =====================================

    if (
        emi_detected and
        signal_quality < 75 and
        variance > 1000
    ):

        status = "CRITICAL"

        severity = "HIGH"

        risk_level = "CRITICAL"

        confidence = 0.95

    # =====================================
    # WARNING STATE
    # =====================================

    elif (
        emi_detected or
        variance > 700 or
        stability_score < 50
    ):

        status = "WARNING"

        severity = "MEDIUM"

        risk_level = "MODERATE"

        confidence = 0.82

    # =====================================
    # EXCELLENT CONDITION
    # =====================================

    elif (
        signal_quality >= 90 and
        stability_score >= 80
    ):

        status = "EXCELLENT"

        severity = "MINIMAL"

        risk_level = "LOW"

        confidence = 0.98

    # =====================================
    # STABLE OPERATION
    # =====================================

    elif signal_quality >= 75:

        status = "GOOD"

        severity = "LOW"

        risk_level = "LOW"

        confidence = 0.88

    # =====================================
    # DEGRADED STATE
    # =====================================

    else:

        status = "DEGRADED"

        severity = "MEDIUM"

        risk_level = "ELEVATED"

        confidence = 0.80

    # =====================================
    # STRUCTURED RESPONSE
    # =====================================

    return {

        "status":
        status,

        "severity":
        severity,

        "risk_level":
        risk_level,

        "confidence":
        confidence
    }