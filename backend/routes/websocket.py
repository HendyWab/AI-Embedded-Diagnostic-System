from fastapi import (
    APIRouter,
    WebSocket,
    WebSocketDisconnect
)

from backend.services.websocket_manager import (
    manager
)

router = APIRouter()


# =========================================
# WEBSOCKET TELEMETRY STREAM
# =========================================

@router.websocket("/ws/telemetry")
async def websocket_endpoint(
    websocket: WebSocket
):

    await manager.connect(
        websocket
    )

    print(
        "WebSocket client connected"
    )

    try:

        while True:

            # Keep connection alive

            await websocket.receive_text()

    except WebSocketDisconnect:

        manager.disconnect(
            websocket
        )

        print(
            "WebSocket client disconnected"
        )