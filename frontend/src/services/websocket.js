const WEBSOCKET_URL =
    "ws://localhost:8000/ws/telemetry";

let socket = null;


// =========================================
// CONNECT
// =========================================

export function connectWebSocket(
    onMessage
)
{
    socket = new WebSocket(
        WEBSOCKET_URL
    );

    // -------------------------------------
    // OPEN
    // -------------------------------------

    socket.onopen = () =>
    {
        console.log(
            "WebSocket connected"
        );

        // keep-alive ping

        setInterval(() =>
        {
            if (
                socket.readyState === 1
            )
            {
                socket.send("ping");
            }

        }, 5000);
    };

    // -------------------------------------
    // RECEIVE
    // -------------------------------------

    socket.onmessage = (
        event
    ) =>
    {
        const data =
            JSON.parse(
                event.data
            );

        onMessage(data);
    };

    // -------------------------------------
    // CLOSE
    // -------------------------------------

    socket.onclose = () =>
    {
        console.log(
            "WebSocket disconnected"
        );

        // auto reconnect

        setTimeout(() =>
        {
            connectWebSocket(
                onMessage
            );

        }, 3000);
    };

    // -------------------------------------
    // ERROR
    // -------------------------------------

    socket.onerror = (
        error
    ) =>
    {
        console.error(
            "WebSocket error:",
            error
        );
    };
}