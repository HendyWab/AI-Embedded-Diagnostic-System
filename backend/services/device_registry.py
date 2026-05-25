"""
===========================================================
DEVICE REGISTRY SERVICE
IEDS - Intelligent Embedded Diagnostic System
===========================================================

Centralized runtime device state management.

Author: HendyWab
===========================================================
"""

from datetime import datetime


class DeviceRegistry:

    """
    Runtime device tracking service.
    """

    def __init__(self):

        self.devices = {}

    # =======================================================
    # UPDATE DEVICE STATE
    # =======================================================

    def update_device(
        self,
        device_id: str,
        diagnostics: dict
    ):

        self.devices[device_id] = {

            "device_id": device_id,

            "health_score":
                diagnostics["health"]["health_score"],

            "risk_level":
                diagnostics["health"]["risk_level"],

            "status":
                diagnostics["health"]["status"],

            "anomaly_detected":
                diagnostics["anomaly"]["detected"],

            "severity":
                diagnostics["anomaly"]["severity"],

            "signal_quality":
                diagnostics["features"]["stability_score"],

            "last_updated":
                datetime.utcnow().isoformat()
        }

    # =======================================================
    # GET SINGLE DEVICE
    # =======================================================

    def get_device(self, device_id: str):

        return self.devices.get(device_id)

    # =======================================================
    # GET ALL DEVICES
    # =======================================================

    def get_all_devices(self):

        return self.devices