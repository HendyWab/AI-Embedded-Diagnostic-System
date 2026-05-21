"""
===========================================
AI ANOMALY DETECTOR MODULE
===========================================

This module evaluates telemetry anomaly
scores and classifies severity levels.

Author: Nangndi Wabede
Project: Intelligent Embedded Diagnostic System
"""

# =========================================
# ANOMALY CLASSIFICATION FUNCTION
# =========================================

def calculate_anomaly_level(anomaly_score: float):
    """
    Convert raw anomaly score into
    human-readable severity level.

    Parameters:
    -----------
    anomaly_score : float
        AI anomaly score between 0.0 and 1.0

    Returns:
    --------
    str
        LOW / MEDIUM / HIGH / CRITICAL
    """

    # Critical instability
    if anomaly_score >= 0.85:
        return "CRITICAL"

    # High anomaly risk
    elif anomaly_score >= 0.65:
        return "HIGH"

    # Moderate anomaly state
    elif anomaly_score >= 0.40:
        return "MEDIUM"

    # Normal operational range
    return "LOW"