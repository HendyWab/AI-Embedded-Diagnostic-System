"""
===========================================
AI RECOMMENDATION ENGINE
===========================================

This module generates AI-assisted
diagnostic interpretations and
infrastructure recommendations
based on telemetry conditions.

Author: HendyWab
Project: Intelligent Embedded Diagnostic System
"""

# =========================================
# RECOMMENDATION ENGINE
# =========================================

def generate_recommendations(
    anomaly_level: str,
    emi_detected: bool,
    signal_quality: float,
    variance: float,
    stability_score: float
):
    """
    Generate intelligent diagnostics
    and infrastructure recommendations.

    Parameters:
    -----------
    anomaly_level : str
        AI anomaly severity level

    emi_detected : bool
        EMI alert state

    signal_quality : float
        Current signal integrity quality

    variance : float
        Signal variance level

    stability_score : float
        Signal stability metric

    Returns:
    --------
    dict
        Structured diagnostic intelligence
    """

    # =====================================
    # DIAGNOSTIC CONTAINERS
    # =====================================

    diagnosis = []

    recommendations = []

    # =====================================
    # CRITICAL ANOMALY ANALYSIS
    # =====================================

    if anomaly_level == "CRITICAL":

        diagnosis.append(
            "Critical telemetry instability detected"
        )

        recommendations.append(
            "Perform immediate embedded system inspection"
        )

        recommendations.append(
            "Inspect grounding integrity"
        )

        recommendations.append(
            "Validate power regulation stability"
        )

    # =====================================
    # HIGH ANOMALY ANALYSIS
    # =====================================

    elif anomaly_level == "HIGH":

        diagnosis.append(
            "High anomaly probability detected"
        )

        recommendations.append(
            "Inspect EMI shielding integrity"
        )

        recommendations.append(
            "Verify DC-DC filtering stage"
        )

        recommendations.append(
            "Check signal isolation paths"
        )

    # =====================================
    # EMI DIAGNOSTICS
    # =====================================

    if emi_detected:

        diagnosis.append(
            "Electromagnetic interference detected"
        )

        recommendations.append(
            "Inspect nearby EMI sources"
        )

        recommendations.append(
            "Validate shielding continuity"
        )

        recommendations.append(
            "Reduce high-frequency interference exposure"
        )

    # =====================================
    # SIGNAL QUALITY ANALYSIS
    # =====================================

    if signal_quality < 75:

        diagnosis.append(
            "Signal quality degradation detected"
        )

        recommendations.append(
            "Verify communication interface stability"
        )

        recommendations.append(
            "Inspect telemetry transmission layer"
        )

    # =====================================
    # HIGH VARIANCE ANALYSIS
    # =====================================

    if variance > 1000:

        diagnosis.append(
            "High signal variance detected"
        )

        recommendations.append(
            "Inspect analog filtering stage"
        )

        recommendations.append(
            "Validate sensor stability"
        )

    # =====================================
    # STABILITY ANALYSIS
    # =====================================

    if stability_score < 50:

        diagnosis.append(
            "Low signal stability detected"
        )

        recommendations.append(
            "Inspect embedded timing consistency"
        )

        recommendations.append(
            "Analyze transient signal disturbances"
        )

    # =====================================
    # NORMAL OPERATION
    # =====================================

    if not diagnosis:

        diagnosis.append(
            "System operating normally"
        )

        recommendations.append(
            "Continue telemetry monitoring"
        )

    # =====================================
    # REMOVE DUPLICATES
    # =====================================

    diagnosis = list(set(diagnosis))

    recommendations = list(set(recommendations))

    # =====================================
    # RETURN STRUCTURED RESPONSE
    # =====================================

    return {

        "diagnosis":
        diagnosis,

        "recommendations":
        recommendations
    }