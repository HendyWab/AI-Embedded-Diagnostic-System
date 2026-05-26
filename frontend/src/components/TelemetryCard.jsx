/*
=========================================================
Intelligent Embedded Diagnostic System (IEDS)
Author: HendyWab

Telemetry Overview Card
=========================================================
*/

import React from "react";

function TelemetryCard({
    telemetry
})
{
    if(!telemetry)
    {
        return (
            <div
                style={{
                    backgroundColor: "#1E293B",
                    padding: "20px",
                    borderRadius: "12px"
                }}
            >
                Waiting for telemetry...
            </div>
        );
    }

    const isDanger =
        telemetry.anomaly_score > 0.7;

    return (
        <div
            style={{
                backgroundColor:
                    isDanger
                    ? "#4B1D1D"
                    : "#1E293B",

                border:
                    isDanger
                    ? "2px solid #FF4D4D"
                    : "none",

                padding: "20px",

                borderRadius: "12px"
            }}
        >
            <h2>
                Telemetry Overview
            </h2>

            {
                isDanger &&
                (
                    <div
                        style={{
                            backgroundColor:
                                "#FF4D4D",

                            padding: "10px",

                            borderRadius: "8px",

                            marginBottom: "15px",

                            fontWeight: "bold"
                        }}
                    >
                        ⚠ EMI ANOMALY DETECTED
                    </div>
                )
            }

            <p>
                Device ID:
                <strong>
                    {" "}
                    {telemetry.device_id}
                </strong>
            </p>

            <p>
                Firmware:
                <strong>
                    {" "}
                    {
                        telemetry.firmware_version
                    }
                </strong>
            </p>

            <p>
                Anomaly Score:
                <strong>
                    {" "}
                    {
                        telemetry.anomaly_score
                    }
                </strong>
            </p>

            <p>
                Signal Quality:
                <strong>
                    {" "}
                    {
                        telemetry.signal_quality
                    }
                </strong>
            </p>

            <p>
                EMI Detected:
                <strong>
                    {" "}
                    {
                        String(
                            telemetry.emi_detected
                        )
                    }
                </strong>
            </p>
        </div>
    );
}

export default TelemetryCard;