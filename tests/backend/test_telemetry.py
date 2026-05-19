# ==============================================================
#
#  Intelligent Embedded Diagnostic System (IEDS)
#  Telemetry API Tests
#
#  File: test_telemetry.py
#
# ==============================================================

from fastapi.testclient import TestClient

from backend.main import app

# ==============================================================
#                      TEST CLIENT
# ==============================================================

client = TestClient(app)

# ==============================================================
#                      TELEMETRY TEST
# ==============================================================

def test_telemetry_ingestion():

    payload = {

        "timestamp": 1710000000,

        "device_id": "IEDS-001",

        "firmware_version": "v0.1.0",

        "anomaly_score": 0.87,

        "signal_quality": 92.5,

        "emi_detected": True,

        "topk_predictions":
        [
            {
                "fault_class":
                "EMI_INTERFERENCE",

                "confidence":
                0.91
            }
        ]
    }

    response = client.post(
        "/telemetry/",
        json=payload
    )

    assert response.status_code == 200

    assert response.json()["status"] \
        == "telemetry_received"

# ==============================================================
#                      LATEST TELEMETRY TEST
# ==============================================================

def test_latest_telemetry():

    response = client.get(
        "/telemetry/latest"
    )

    assert response.status_code == 200
