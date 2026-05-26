// =========================================================
//
// Intelligent Embedded Diagnostic System (IEDS)
// Device Status Card
//
// Author: HendyWab
//
// Description:
// Displays backend and fleet connection state.
//
// =========================================================

import React from "react";

function DeviceStatusCard({
    connected,
    devices
})
{

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
                    {devices.length}
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
                            connected
                            ? "#4ADE80"
                            : "#FF4D4D"
                    }}
                >
                    {
                        connected
                        ? "connected"
                        : "disconnected"
                    }
                </strong>
            </p>

        </div>
    );
}

export default DeviceStatusCard;