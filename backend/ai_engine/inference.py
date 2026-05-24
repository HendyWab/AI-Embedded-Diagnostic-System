"""
===========================================================
AI INFERENCE ENGINE
IEDS - Intelligent Embedded Diagnostic System
===========================================================

Central AI processing pipeline.

Author: HendyWab
===========================================================
"""

from ai_engine.feature_extractor import FeatureExtractor
from ai_engine.health_score import HealthScoreEngine


class AIInferenceEngine:

    """
    =======================================================
    Main AI Engine
    =======================================================

    Pipeline:
        Raw Signal
            ↓
        Feature Extraction
            ↓
        Health Analysis
            ↓
        Diagnostics Output
    """

    def __init__(self):

        self.extractor = FeatureExtractor()

        self.health_engine = HealthScoreEngine()

    # =======================================================
    # RUN COMPLETE AI ANALYSIS
    # =======================================================
    def analyze_signal(self, signal):

        """
        Complete telemetry AI pipeline.
        """

        # ===================================================
        # EXTRACT FEATURES
        # ===================================================

        features = self.extractor.extract_features(signal)

        # ===================================================
        # COMPUTE HEALTH
        # ===================================================

        health = self.health_engine.compute_health(features)

        # ===================================================
        # DETERMINE ANOMALY
        # ===================================================

        anomaly_detected = health["health_score"] < 70

        # ===================================================
        # RETURN COMPLETE AI RESULT
        # ===================================================

        return {

            "features": features,

            "health": health,

            "anomaly_detected": anomaly_detected
        }