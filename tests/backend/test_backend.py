# ==============================================================
#
#  Intelligent Embedded Diagnostic System (IEDS)
#  Backend API Tests
#
#  File: test_backend.py
#
# ==============================================================

from fastapi.testclient import TestClient

from backend.main import app

# ==============================================================
#                      TEST CLIENT
# ==============================================================

client = TestClient(app)

# ==============================================================
#                      ROOT ENDPOINT TEST
# ==============================================================

def test_root_endpoint():

    response = client.get("/")

    assert response.status_code == 200

    assert response.json()["status"] == "running"

# ==============================================================
#                      DEVICE STATUS TEST
# ==============================================================

def test_device_status():

    response = client.get("/device/status")

    assert response.status_code == 200

    assert "backend_status" in response.json()
