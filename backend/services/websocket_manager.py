from fastapi import WebSocket


class ConnectionManager:

    def __init__(self):

        self.active_connections = []


    # =====================================
    # CONNECT
    # =====================================

    async def connect(
        self,
        websocket: WebSocket
    ):

        await websocket.accept()

        self.active_connections.append(
            websocket
        )


    # =====================================
    # DISCONNECT
    # =====================================

    def disconnect(
        self,
        websocket: WebSocket
    ):

        if websocket in self.active_connections:

            self.active_connections.remove(
                websocket
            )


    # =====================================
    # BROADCAST
    # =====================================

    async def broadcast(
        self,
        data: dict
    ):

        disconnected = []

        for connection in self.active_connections:

            try:

                await connection.send_json(
                    data
                )

            except Exception:

                disconnected.append(
                    connection
                )

        # Cleanup dead connections

        for connection in disconnected:

            self.disconnect(
                connection
            )


# =========================================
# GLOBAL MANAGER
# =========================================

manager = ConnectionManager()