// =========================================================
//
// Intelligent Embedded Diagnostic System (IEDS)
// Fleet Device Card Component
//
// Author: HendyWab
//
// Description:
// Displays fleet telemetry state.
//
// =========================================================

import React from "react";

function FleetDeviceCard({
    device
})
{

    const isDanger =
        device.anomaly_score > 0.7;

    return (

        <div
            style={{
                backgroundColor:
                    isDanger
                    ? "#8B1E1E"
                    : "#1E293B",

                border:
                    isDanger
                    ? "2px solid #FF4D4D"
                    : "none",

                padding: "20px",

                borderRadius: "12px",

                boxShadow:
                    "0px 0px 10px rgba(0,0,0,0.4)"
            }}
        >

            <h2>
                {device.device_id}
            </h2>

            <p>
                Firmware:
                {" "}
                <strong>
                    {device.firmware_version}
                </strong>
            </p>

            <p>
                Signal:
                {" "}
                {device.signal_quality}
            </p>

            <p>
                Anomaly:
                {" "}
                {device.anomaly_score}
            </p>

            <p>
                EMI:
                {" "}

                <strong>
                    {
                        device.emi_detected
                        ? "ALERT"
                        : "NORMAL"
                    }
                </strong>
            </p>

        </div>
    );
}

export default FleetDeviceCard;