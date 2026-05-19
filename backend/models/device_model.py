# ==============================================================
#
#  Intelligent Embedded Diagnostic System (IEDS)
#  Device Data Model
#
#  File: device_model.py
#
# ==============================================================

from pydantic import BaseModel

# ==============================================================
#                      DEVICE MODEL
# ==============================================================

class DeviceModel(BaseModel):

    device_id: str

    firmware_version: str

    wifi_connected: bool

    mqtt_connected: bool

    system_health: str
