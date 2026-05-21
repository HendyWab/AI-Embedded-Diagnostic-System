"""
===========================================================
DEVICE HEALTH SCORING ENGINE
IEDS - Intelligent Embedded Diagnostic System
===========================================================

Transforms extracted telemetry features into
enterprise-grade device health metrics.

Author: HendyWab
===========================================================
"""


class HealthScoreEngine:

    """
    =======================================================
    Device Health Evaluation System
    =======================================================

    Produces:
        - health score
        - risk level
        - operational state
        - diagnostics explanation
    """

    def __init__(self):
        pass

    # =======================================================
    # COMPUTE DEVICE HEALTH
    # =======================================================
    def compute_health(self, features):

        """
        Health computation algorithm.
        """

        health = 100

        variance = features["variance"]
        spikes = features["spike_count"]
        stability = features["stability_score"]

        # ===================================================
        # VARIANCE PENALTY
        # ===================================================

        if variance > 100:
            health -= 30

        elif variance > 50:
            health -= 15

        # ===================================================
        # SPIKE PENALTY
        # ===================================================

        if spikes > 10:
            health -= 25

        elif spikes > 5:
            health -= 10

        # ===================================================
        # STABILITY PENALTY
        # ===================================================

        if stability < 50:
            health -= 25

        elif stability < 70:
            health -= 10

        # ===================================================
        # CLAMP SCORE
        # ===================================================

        health = max(0, min(100, health))

        # ===================================================
        # DETERMINE RISK LEVEL
        # ===================================================

        if health >= 85:
            risk = "LOW"
            status = "HEALTHY"

        elif health >= 60:
            risk = "MEDIUM"
            status = "DEGRADED"

        else:
            risk = "HIGH"
            status = "CRITICAL"

        # ===================================================
        # AI EXPLANATION
        # ===================================================

        explanation = self.generate_explanation(
            variance,
            spikes,
            stability
        )

        return {

            "health_score": health,

            "risk_level": risk,

            "status": status,

            "explanation": explanation
        }

    # =======================================================
    # GENERATE AI EXPLANATION
    # =======================================================
    @staticmethod
    def generate_explanation(variance, spikes, stability):

        """
        Generates human-readable AI diagnostics.
        """

        explanations = []

        if variance > 50:
            explanations.append(
                "High signal variance detected"
            )

        if spikes > 5:
            explanations.append(
                "Abnormal waveform spikes observed"
            )

        if stability < 70:
            explanations.append(
                "Signal stability degradation detected"
            )

        if not explanations:
            return "Telemetry operating within normal parameters"

        return " | ".join(explanations)