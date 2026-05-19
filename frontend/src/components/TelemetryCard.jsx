import React,
{
    useEffect,
    useState
}
from "react";

import
{
    fetchLatestTelemetry
}
from "../services/api";

function TelemetryCard()
{
    const [telemetry,
           setTelemetry] =
        useState(null);

    useEffect(() =>
    {
        async function loadTelemetry()
        {
            const data =
                await fetchLatestTelemetry();

            setTelemetry(data);
        }

        /*
         * Initial fetch.
         */
        loadTelemetry();

        /*
         * Poll backend every 3 seconds.
         */
        const interval =
            setInterval(
                loadTelemetry,
                3000
            );

        /*
         * Cleanup interval.
         */
        return () =>
            clearInterval(interval);

    }, []);

    /*
     * No telemetry available yet.
     */
    if(
        !telemetry ||
        telemetry.status ===
        "no_telemetry_available"
    )
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
                    Telemetry Overview
                </h2>

                <p>
                    Waiting for telemetry data...
                </p>
            </div>
        );
    }

    /*
     * Operational anomaly state.
     */
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

                borderRadius: "12px",

                boxShadow:
                    "0px 0px 10px rgba(0,0,0,0.4)"
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

                            color: "white",

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
                Anomaly Score:
                <strong>
                    {" "}
                    {telemetry.anomaly_score}
                </strong>
            </p>

            <p>
                Signal Quality:
                <strong>
                    {" "}
                    {telemetry.signal_quality}
                </strong>
            </p>

            <p>
                EMI Detected:
                <strong>
                    {" "}
                    {String(
                        telemetry.emi_detected
                    )}
                </strong>
            </p>
        </div>
    );
}

export default TelemetryCard;