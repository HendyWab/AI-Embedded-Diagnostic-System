# ==============================================================
#
#  Intelligent Embedded Diagnostic System (IEDS)
#  Telemetry Simulator
#
#  File: telemetry_simulator.py
#
#  Description:
#  Simulates embedded telemetry generation and continuously
#  pushes telemetry payloads to the FastAPI backend.
#
# ==============================================================

import time
import random
import requests

# ==============================================================
#                      CONFIGURATION
# ==============================================================

BACKEND_URL = \
    "http://127.0.0.1:8000/telemetry/"

DEVICE_ID = "IEDS-001"

FIRMWARE_VERSION = "v0.1.0"

# ==============================================================
#                      HELPER FUNCTIONS
# ==============================================================

def generate_telemetry_payload():
    """
    Generates simulated telemetry payload.
    """

    anomaly_score = round(
        random.uniform(0.05, 0.98),
        2
    )

    signal_quality = round(
        random.uniform(75.0, 100.0),
        2
    )

    emi_detected = anomaly_score > 0.7

    payload = {

        "timestamp":
        int(time.time()),

        "device_id":
        DEVICE_ID,

        "firmware_version":
        FIRMWARE_VERSION,

        "anomaly_score":
        anomaly_score,

        "signal_quality":
        signal_quality,

        "emi_detected":
        emi_detected,

        "topk_predictions":
        [
            {
                "fault_class":
                "EMI_INTERFERENCE",

                "confidence":
                round(
                    random.uniform(0.70, 0.99),
                    2
                )
            },

            {
                "fault_class":
                "POWER_FAULT",

                "confidence":
                round(
                    random.uniform(0.01, 0.20),
                    2
                )
            }
        ]
    }

    return payload

# ==============================================================
#                      MAIN LOOP
# ==============================================================

def main():
    """
    Continuously sends telemetry.
    """

    print(
        "\n[IEDS] Telemetry simulator started.\n"
    )

    while True:

        payload = \
            generate_telemetry_payload()

        try:

            response = requests.post(
                BACKEND_URL,
                json=payload
            )

            print(
                "[Telemetry Sent]",
                response.status_code,
                payload
            )

        except Exception as error:

            print(
                "[Telemetry Error]",
                error
            )

        time.sleep(3)

# ==============================================================
#                      ENTRY POINT
# ==============================================================

if __name__ == "__main__":

    main()