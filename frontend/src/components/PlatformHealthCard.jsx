import React from "react";

function PlatformHealthCard({
    websocketStatus,
    systemMetrics,
    uptimeDisplay
})
{
    return (

        <div
            style={{
                backgroundColor: "#1E293B",
                padding: "20px",
                borderRadius: "12px"
            }}
        >

            <h3>
                Platform Health
            </h3>

            <p>
                MQTT Broker:
                <span
                    style={{
                        color: "#22C55E"
                    }}
                >
                    {" "}ONLINE
                </span>
            </p>

            <p>
                Backend API:
                <span
                    style={{
                        color: "#22C55E"
                    }}
                >
                    {" "}ONLINE
                </span>
            </p>

            <p>
                Database:
                <span
                    style={{
                        color: "#22C55E"
                    }}
                >
                    {" "}ONLINE
                </span>
            </p>

            <p>
                WebSocket:
                <span
                    style={{
                        color:
                        websocketStatus ===
                        "connected"

                        ? "#22C55E"

                        : "#EF4444"
                    }}
                >
                    {" "}
                    {websocketStatus}
                </span>
            </p>

            <p>
                Uptime:
                {" "}
                {uptimeDisplay}
            </p>

        </div>
    );
}

export default PlatformHealthCard;