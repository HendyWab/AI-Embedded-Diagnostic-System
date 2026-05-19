const WEBSOCKET_URL =
    "ws://localhost:8000/ws/telemetry";


let socket = null;


export function connectWebSocket(
    onMessage
)
{
    socket = new WebSocket(
        WEBSOCKET_URL
    );

    socket.onopen = () =>
    {
        console.log(
            "WebSocket connected"
        );
    };

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

    socket.onclose = () =>
    {
        console.log(
            "WebSocket disconnected"
        );

        setTimeout(() =>
        {
            connectWebSocket(
                onMessage
            );

        }, 3000);
    };

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