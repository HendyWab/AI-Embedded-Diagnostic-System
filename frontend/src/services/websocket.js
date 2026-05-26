/*
=========================================================
Intelligent Embedded Diagnostic System (IEDS)
Author: HendyWab

WebSocket Service

Description:
Handles real-time telemetry streaming
between frontend dashboard and FastAPI backend.
=========================================================
*/


/* =======================================================
 * ACTIVE SOCKET
 * ===================================================== */

let socket = null;


/* =======================================================
 * CONNECT WEBSOCKET
 * ===================================================== */

export function connectWebSocket(
    onMessage,
    onConnect,
    onDisconnect
)
{
    /*
    -------------------------------------------------------
    CREATE SOCKET CONNECTION
    -------------------------------------------------------
    */

    socket = new WebSocket(
        "ws://127.0.0.1:8000/ws/telemetry"
    );


    /*
    -------------------------------------------------------
    CONNECTION SUCCESS
    -------------------------------------------------------
    */

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


    /*
    -------------------------------------------------------
    TELEMETRY RECEIVED
    -------------------------------------------------------
    */

    socket.onmessage = (event) =>
    {
        const data =
            JSON.parse(
                event.data
            );

        console.log(
            "Telemetry received:",
            data
        );

        onMessage(data);
    };


    /*
    -------------------------------------------------------
    CONNECTION CLOSED
    -------------------------------------------------------
    */

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


    /*
    -------------------------------------------------------
    CONNECTION ERROR
    -------------------------------------------------------
    */

    socket.onerror = (error) =>
    {
        console.error(
            "WebSocket error:",
            error
        );
    };


    /*
    -------------------------------------------------------
    RETURN SOCKET
    -------------------------------------------------------
    */

    return socket;
}


/* =======================================================
 * DISCONNECT WEBSOCKET
 * ===================================================== */

export function disconnectWebSocket()
{
    if(socket)
    {
        socket.close();

        console.log(
            "WebSocket manually closed"
        );
    }
}