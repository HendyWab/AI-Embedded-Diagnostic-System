"""
===========================================
AI RECOMMENDATION ENGINE
===========================================

This module generates intelligent
maintenance and diagnostic recommendations
based on telemetry conditions.

Author: Nangndi Wabede
Project: Intelligent Embedded Diagnostic System
"""

# =========================================
# AI RECOMMENDATION GENERATOR
# =========================================

def generate_recommendation(
    anomaly_level: str,
    emi_detected: bool,
    signal_quality: float
):
    """
    Generate intelligent recommendation.

    Parameters:
    -----------
    anomaly_level : str
        AI anomaly severity level

    emi_detected : bool
        EMI alert state

    signal_quality : float
        Current signal integrity quality

    Returns:
    --------
    str
        Diagnostic recommendation
    """

    # Severe anomaly state
    if anomaly_level == "CRITICAL":
        return (
            "Immediate inspection required. "
            "Severe telemetry instability detected."
        )

    # High anomaly risk
    if anomaly_level == "HIGH":
        return (
            "Inspect EMI shielding and "
            "power filtering integrity."
        )

    # EMI warning state
    if emi_detected:
        return (
            "Monitor EMI sources near "
            "embedded system."
        )

    # Signal degradation
    if signal_quality < 75:
        return (
            "Signal quality degradation detected. "
            "Verify communication layer."
        )

    # Stable operational state
    return "System operating normally."
