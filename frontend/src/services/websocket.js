// =========================================================
//
// Intelligent Embedded Diagnostic System (IEDS)
// WebSocket Service
//
// File: websocket.js
//
// Description:
// Handles frontend WebSocket communication
// with FastAPI backend.
//
// Features:
// - Real-time telemetry streaming
// - WebSocket connection management
// - Automatic telemetry reception
// - Connection state callbacks
//
// =========================================================


/* ========================================================
 * CONNECT WEBSOCKET
 * ====================================================== */

export function connectWebSocket(
    onMessage,
    onConnect,
    onDisconnect
)
{

    /* ====================================================
     * CREATE SOCKET
     * ================================================== */

    const socket =
        new WebSocket(
            "ws://localhost:8000/ws/telemetry"
        );


    /* ====================================================
     * ON OPEN
     * ================================================== */

    socket.onopen = () =>
    {
        console.log(
            "WebSocket connected"
        );

        if(onConnect)
        {
            onConnect();
        }
    };


    /* ====================================================
     * ON MESSAGE
     * ================================================== */

    socket.onmessage = (event) =>
    {

        const data =
            JSON.parse(
                event.data
            );

        console.log(
            "WebSocket telemetry:",
            data
        );

        onMessage(data);
    };


    /* ====================================================
     * ON CLOSE
     * ================================================== */

    socket.onclose = () =>
    {
        console.log(
            "WebSocket disconnected"
        );

        if(onDisconnect)
        {
            onDisconnect();
        }
    };


    /* ====================================================
     * ON ERROR
     * ================================================== */

    socket.onerror = (error) =>
    {
        console.error(
            "WebSocket error:",
            error
        );
    };


    /* ====================================================
     * RETURN SOCKET
     * ================================================== */

    return socket;
}