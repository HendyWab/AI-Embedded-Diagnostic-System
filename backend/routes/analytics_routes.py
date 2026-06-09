# =========================================================
#
# Intelligent Embedded Diagnostic System (IEDS)
# Fleet Analytics API
#
# Author: HendyWab
#
# =========================================================

from fastapi import APIRouter

from backend.database.db import SessionLocal

from backend.models.telemetry_db_model import (
    TelemetryRecord
)

import backend.mqtt.mqtt_client as mqtt_client


# =========================================================
# ROUTER
# =========================================================

router = APIRouter()


# =========================================================
# FLEET ANALYTICS
# =========================================================

@router.get("/analytics/fleet")
def fleet_analytics():

    db = SessionLocal()

    records = db.query(
        TelemetryRecord
    ).all()

    if not records:

        db.close()

        return {

            "average_signal": 0,

            "average_anomaly": 0,

            "active_alerts": 0,

            "online_devices":
            len(
                mqtt_client.get_online_devices()
            ),

            "fleet_health":
            mqtt_client.get_fleet_health(),

            "total_records": 0
        }

    average_signal = round(

        sum(
            record.signal_quality
            for record in records
        )

        / len(records),

        2
    )

    average_anomaly = round(

        sum(
            record.anomaly_score
            for record in records
        )

        / len(records),

        2
    )

    active_alerts = len(

        [
            record

            for record in records

            if record.emi_detected
        ]
    )

    db.close()

    return {

        "average_signal":
        average_signal,

        "average_anomaly":
        average_anomaly,

        "active_alerts":
        active_alerts,

        "online_devices":
        len(
            mqtt_client.get_online_devices()
        ),

        "fleet_health":
        mqtt_client.get_fleet_health(),

        "total_records":
        len(records)
    }