// =========================================================
//
// Intelligent Embedded Diagnostic System (IEDS)
// Device Status Card
//
// Author: HendyWab
//
// Description:
// Displays backend and websocket status.
//
// =========================================================

import React from "react";

function DeviceStatusCard({
    websocketStatus,
    devices = {}
})
{

    // =====================================================
    // DEVICE COUNT
    // =====================================================

    const deviceCount =
        Object.keys(devices).length;


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div
            style={{
                backgroundColor: "#1E293B",

                padding: "20px",

                borderRadius: "12px",

                boxShadow:
                    "0px 0px 10px rgba(0,0,0,0.4)"
            }}
        >

            <h2>
                Device Status
            </h2>

            <p>
                Registered Devices:
                {" "}
                <strong>
                    {deviceCount}
                </strong>
            </p>

            <p>
                Backend Status:
                {" "}
                <strong>
                    operational
                </strong>
            </p>

            <p>
                WebSocket:
                {" "}

                <strong
                    style={{
                        color:
                            websocketStatus === "connected"
                            ? "#22C55E"
                            : "#EF4444"
                    }}
                >
                    {websocketStatus}
                </strong>

            </p>

        </div>
    );
}

export default DeviceStatusCard;