"""
===========================================================
FEATURE EXTRACTION ENGINE
IEDS - Intelligent Embedded Diagnostic System
===========================================================

This module extracts advanced telemetry and signal
features from incoming embedded device data.

These features are later used by:
    - AI anomaly detection
    - TinyML models
    - Health scoring
    - Predictive diagnostics

Author: HendyWab
===========================================================
"""

import math
import statistics


class FeatureExtractor:
    """
    =======================================================
    Feature Extraction Class
    =======================================================

    Responsible for:
        - Signal statistics
        - Waveform characteristics
        - EMI behavior analysis
        - Telemetry quality metrics
    """

    def __init__(self):
        pass

    # =======================================================
    # ROOT MEAN SQUARE (RMS)
    # =======================================================
    @staticmethod
    def compute_rms(signal):

        """
        RMS measures effective signal power.

        Higher RMS may indicate:
            - EMI spikes
            - instability
            - amplified noise
        """

        if not signal:
            return 0

        square_sum = sum(x ** 2 for x in signal)

        return math.sqrt(square_sum / len(signal))

    # =======================================================
    # SIGNAL VARIANCE
    # =======================================================
    @staticmethod
    def compute_variance(signal):

        """
        Variance measures signal instability.

        High variance:
            -> unstable telemetry
            -> possible interference
        """

        if len(signal) < 2:
            return 0

        return statistics.variance(signal)

    # =======================================================
    # SIGNAL STANDARD DEVIATION
    # =======================================================
    @staticmethod
    def compute_std(signal):

        """
        Standard deviation indicates
        signal dispersion.
        """

        if len(signal) < 2:
            return 0

        return statistics.stdev(signal)

    # =======================================================
    # SIGNAL AVERAGE
    # =======================================================
    @staticmethod
    def compute_mean(signal):

        """
        Mean signal level.
        """

        if not signal:
            return 0

        return statistics.mean(signal)

    # =======================================================
    # SPIKE DETECTION
    # =======================================================
    @staticmethod
    def count_spikes(signal, threshold=15):

        """
        Counts rapid waveform changes.

        Large transitions often indicate:
            - EMI bursts
            - unstable electronics
            - transient interference
        """

        spikes = 0

        for i in range(1, len(signal)):

            delta = abs(signal[i] - signal[i - 1])

            if delta > threshold:
                spikes += 1

        return spikes

    # =======================================================
    # SIGNAL STABILITY SCORE
    # =======================================================
    @staticmethod
    def stability_score(signal):

        """
        Generates a stability score.

        100 -> very stable
        0   -> extremely unstable
        """

        variance = FeatureExtractor.compute_variance(signal)

        score = max(0, 100 - variance)

        return round(score, 2)

    # =======================================================
    # EXTRACT COMPLETE FEATURE SET
    # =======================================================
    def extract_features(self, signal):

        """
        Main extraction pipeline.

        Returns:
            Dictionary containing all extracted metrics.
        """

        features = {

            "mean": self.compute_mean(signal),

            "rms": self.compute_rms(signal),

            "variance": self.compute_variance(signal),

            "std_dev": self.compute_std(signal),

            "spike_count": self.count_spikes(signal),

            "stability_score": self.stability_score(signal)
        }

        return features