"""
===========================================
DEVICE HEALTH CLASSIFIER
===========================================

This module evaluates embedded device
health based on signal integrity and
EMI detection state.

Author: Nangndi Wabede
Project: Intelligent Embedded Diagnostic System
"""

# =========================================
# DEVICE HEALTH CLASSIFICATION
# =========================================

def classify_health(signal_quality: float,
                    emi_detected: bool):
    """
    Determine overall embedded system health.

    Parameters:
    -----------
    signal_quality : float
        Signal quality percentage

    emi_detected : bool
        EMI anomaly detection flag

    Returns:
    --------
    str
        EXCELLENT / GOOD / WARNING /
        DEGRADED / CRITICAL
    """

    # Severe condition
    if emi_detected and signal_quality < 80:
        return "CRITICAL"

    # EMI present but still operational
    if emi_detected:
        return "WARNING"

    # High-quality signal integrity
    if signal_quality >= 90:
        return "EXCELLENT"

    # Stable operational state
    if signal_quality >= 75:
        return "GOOD"

    # Weak communication quality
    return "DEGRADED"