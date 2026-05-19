# ==============================================================
#
#  Intelligent Embedded Diagnostic System (IEDS)
#  Telemetry Storage Layer
#
#  File: telemetry_store.py
#
#  Description:
#  SQLite telemetry persistence layer.
#
# ==============================================================

import sqlite3

from pathlib import Path

# ==============================================================
#                      DATABASE CONFIGURATION
# ==============================================================

DATABASE_DIR = Path("backend/database")

DATABASE_DIR.mkdir(
    parents=True,
    exist_ok=True
)

DATABASE_PATH = \
    DATABASE_DIR / "telemetry.db"

# ==============================================================
#                      DATABASE INITIALIZATION
# ==============================================================

def initialize_database():
    """
    Creates telemetry table if not existing.
    """

    connection = sqlite3.connect(
        DATABASE_PATH
    )

    cursor = connection.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS telemetry
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,

            timestamp INTEGER,

            device_id TEXT,

            firmware_version TEXT,

            anomaly_score REAL,

            signal_quality REAL,

            emi_detected INTEGER
        )
        """
    )

    connection.commit()

    connection.close()

# ==============================================================
#                      TELEMETRY INSERTION
# ==============================================================

def store_telemetry(payload):
    """
    Stores telemetry payload into SQLite.
    """

    connection = sqlite3.connect(
        DATABASE_PATH
    )

    cursor = connection.cursor()

    cursor.execute(
        """
        INSERT INTO telemetry
        (
            timestamp,
            device_id,
            firmware_version,
            anomaly_score,
            signal_quality,
            emi_detected
        )
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            payload["timestamp"],

            payload["device_id"],

            payload["firmware_version"],

            payload["anomaly_score"],

            payload["signal_quality"],

            int(payload["emi_detected"])
        )
    )

    connection.commit()

    connection.close()

# ==============================================================
#                      TELEMETRY RETRIEVAL
# ==============================================================

def fetch_recent_telemetry(limit=20):
    """
    Fetches recent telemetry history.
    """

    connection = sqlite3.connect(
        DATABASE_PATH
    )

    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT
            timestamp,
            device_id,
            firmware_version,
            anomaly_score,
            signal_quality,
            emi_detected

        FROM telemetry

        ORDER BY id DESC

        LIMIT ?
        """,
        (limit,)
    )

    rows = cursor.fetchall()

    connection.close()

    telemetry_history = []

    for row in rows:

        telemetry_history.append(
            {
                "timestamp": row[0],

                "device_id": row[1],

                "firmware_version": row[2],

                "anomaly_score": row[3],

                "signal_quality": row[4],

                "emi_detected": bool(row[5])
            }
        )

    return telemetry_history
