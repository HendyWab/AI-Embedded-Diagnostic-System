from fastapi import APIRouter
from datetime import datetime

from backend.services.mqtt_client import (
    device_last_seen
)

router = APIRouter()

@router.get("/device/health")
def device_health():

    now = datetime.utcnow()

    results = []

    for device_id, last_seen in device_last_seen.items():

        offline_seconds = (
            now - last_seen
        ).total_seconds()

        results.append({

            "device_id":
            device_id,

            "status":
            "ONLINE"
            if offline_seconds < 30
            else "OFFLINE"
        })

    return results