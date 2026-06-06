import React from "react";

function TelemetryHistory({
    telemetryHistory = []
})
{
    return (

        <div
            style={{
                backgroundColor: "#1E293B",
                padding: "20px",
                borderRadius: "12px",
                boxShadow:
                    "0px 0px 10px rgba(0,0,0,0.4)",
                maxHeight: "450px",
                overflowY: "auto"
            }}
        >

            <h2
                style={{
                    marginBottom: "20px"
                }}
            >
                Telemetry History
            </h2>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    color: "white"
                }}
            >

                <thead>

                    <tr>

                        <th
                            style={{
                                textAlign: "left",
                                padding: "10px"
                            }}
                        >
                            Device
                        </th>

                        <th
                            style={{
                                textAlign: "left",
                                padding: "10px"
                            }}
                        >
                            Signal
                        </th>

                        <th
                            style={{
                                textAlign: "left",
                                padding: "10px"
                            }}
                        >
                            Score
                        </th>

                        <th
                            style={{
                                textAlign: "left",
                                padding: "10px"
                            }}
                        >
                            EMI
                        </th>

                        <th
                            style={{
                                textAlign: "left",
                                padding: "10px"
                            }}
                        >
                            Timestamp
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        [...telemetryHistory]
                            .reverse()
                            .slice(0, 100)
                            .map(
                                (
                                    record,
                                    index
                                ) => (

                                    <tr
                                        key={index}
                                    >

                                        <td
                                            style={{
                                                padding: "8px"
                                            }}
                                        >
                                            {
                                                record.device_id
                                            }
                                        </td>

                                        <td
                                            style={{
                                                padding: "8px"
                                            }}
                                        >
                                            {
                                                record.signal_quality
                                            }
                                        </td>

                                        <td
                                            style={{
                                                padding: "8px"
                                            }}
                                        >
                                            {
                                                record.anomaly_score
                                            }
                                        </td>

                                        <td
                                            style={{
                                                padding: "8px",
                                                color:
                                                    record.emi_detected
                                                    ? "#EF4444"
                                                    : "#22C55E"
                                            }}
                                        >
                                            {
                                                record.emi_detected
                                                    ? "ALERT"
                                                    : "NORMAL"
                                            }
                                        </td>

                                        <td
                                            style={{
                                                padding: "8px"
                                            }}
                                        >
                                            {
                                                record.timestamp
                                            }
                                        </td>

                                    </tr>
                                )
                            )
                    }

                </tbody>

            </table>

        </div>

    );
}

export default TelemetryHistory;