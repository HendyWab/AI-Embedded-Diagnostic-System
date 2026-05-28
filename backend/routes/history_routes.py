# =========================================================
#
# Intelligent Embedded Diagnostic System (IEDS)
# Telemetry History Routes
#
# Author: HendyWab
#
# Description:
# Historical telemetry retrieval endpoints.
#
# =========================================================


# =========================================================
# IMPORTS
# =========================================================

from fastapi import (
    APIRouter
)

from sqlalchemy import (
    desc
)

from backend.database.db import (
    SessionLocal
)

from backend.models.telemetry_db_model import (
    TelemetryRecord
)


# =========================================================
# ROUTER
# =========================================================

router = APIRouter()


# =========================================================
# TELEMETRY HISTORY
# =========================================================

@router.get("/telemetry/history")

def telemetry_history(
    limit: int = 100
):

    db = SessionLocal()

    records = (

        db.query(
            TelemetryRecord
        )

        .order_by(
            desc(
                TelemetryRecord.id
            )
        )

        .limit(limit)

        .all()
    )

    db.close()

    return [

        {
            "device_id":
            record.device_id,

            "anomaly_score":
            record.anomaly_score,

            "signal_quality":
            record.signal_quality,

            "emi_detected":
            record.emi_detected,

            "timestamp":
            str(record.timestamp)
        }

        for record in records
    ]