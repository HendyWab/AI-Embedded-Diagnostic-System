from sqlalchemy import (
    Column,
    Integer,
    Float,
    String,
    Boolean
)

from backend.database.db import (
    Base
)


class TelemetryRecord(Base):

    __tablename__ = "telemetry"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    device_id = Column(
        String
    )

    anomaly_score = Column(
        Float
    )

    signal_quality = Column(
        Float
    )

    emi_detected = Column(
        Boolean
    )

    timestamp = Column(
        String
    )