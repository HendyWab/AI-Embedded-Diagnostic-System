# ==============================================================
#
#  Intelligent Embedded Diagnostic System (IEDS)
#  Device Routes
#
#  File: device.py
#
# ==============================================================

from fastapi import APIRouter

from backend.models.device_model import DeviceModel

# ==============================================================
#                      ROUTER INSTANCE
# ==============================================================

router = APIRouter()

# ==============================================================
#                      MOCK STORAGE
# ==============================================================

registered_devices = []

# ==============================================================
#                      DEVICE ENDPOINTS
# ==============================================================

@router.post("/register")
async def register_device(
    device: DeviceModel
):
    """
    Registers embedded diagnostic device.
    """

    registered_devices.append(device)

    return {
        "status": "device_registered",
        "device_id": device.device_id
    }


@router.get("/status")
async def get_device_status():
    """
    Returns registered device status.
    """

    return {
        "registered_devices":
        len(registered_devices),

        "backend_status":
        "operational"
    }
