# ==============================================================
#
#  Intelligent Embedded Diagnostic System (IEDS)
#  Device API Tests
#
#  File: test_device.py
#
# ==============================================================

from fastapi.testclient import TestClient

from backend.main import app

# ==============================================================
#                      TEST CLIENT
# ==============================================================

client = TestClient(app)

# ==============================================================
#                      DEVICE REGISTRATION TEST
# ==============================================================

def test_device_registration():

    payload = {

        "device_id": "IEDS-001",

        "firmware_version": "v0.1.0",

        "wifi_connected": True,

        "mqtt_connected": True,

        "system_health": "NORMAL"
    }

    response = client.post(
        "/device/register",
        json=payload
    )

    assert response.status_code == 200

    assert response.json()["status"] \
        == "device_registered"
