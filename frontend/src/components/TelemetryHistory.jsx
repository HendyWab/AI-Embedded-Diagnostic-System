import React from "react";
<<<<<<< HEAD

function TelemetryHistory({
    telemetryHistory = []
})
{
=======
import { saveAs }
from "file-saver";

function TelemetryHistory({
    telemetryHistory = [],
    selectedDevice,
    setSelectedDevice,
    emiFilter,
    setEmiFilter
})
{
    let filteredHistory =
        telemetryHistory;

    if (
        selectedDevice !== "ALL"
    )
    {
        filteredHistory =
            filteredHistory.filter(
                (record) =>
                    record.device_id ===
                    selectedDevice
            );
    }

    if (
        emiFilter === "ALERT"
    )
    {
        filteredHistory =
            filteredHistory.filter(
                (record) =>
                    record.emi_detected
            );
    }

    if (
        emiFilter === "NORMAL"
    )
    {
        filteredHistory =
            filteredHistory.filter(
                (record) =>
                    !record.emi_detected
            );
    }

    const availableDevices = [

        "ALL",

        ...new Set(

            telemetryHistory.map(
                (record) =>
                    record.device_id
            )
        )
    ];
    function exportCSV()
    {
        const rows = [

            [
                "device_id",
                "signal_quality",
                "anomaly_score",
                "emi_detected",
                "timestamp"
            ]
        ];

        filteredHistory.forEach(
            (record) =>
            {
                rows.push([
                    record.device_id,
                    record.signal_quality,
                    record.anomaly_score,
                    record.emi_detected,
                    record.timestamp
                ]);
            }
        );

        const csvContent =

            rows

            .map(
                (row) =>
                    row.join(",")
            )

            .join("\n");

        const blob = new Blob(

            [csvContent],

            {
                type:
                "text/csv;charset=utf-8;"
            }
        );

        saveAs(
            blob,
            "telemetry_history.csv"
        );
    }
>>>>>>> feature5-v0.4-dashboard-enhancements
    return (

        <div
            style={{
                backgroundColor: "#1E293B",
                padding: "20px",
                borderRadius: "12px",
                boxShadow:
                    "0px 0px 10px rgba(0,0,0,0.4)",
<<<<<<< HEAD
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
=======
                maxHeight: "350px",
                overflowY: "auto"
            }}
        >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px"
                    }}
                >

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px"
                    }}
                >

                   <h2 style={{ margin: 0 }}>
                        Telemetry History
                    </h2>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px"
                        }}
                    >
                        {/* dropdowns + button */}
                    </div>
                    
                    <select

                        value={
                            selectedDevice
                        }

                        onChange={
                            (event) =>
                                setSelectedDevice(
                                    event.target.value
                                )
                        }

                        style={{
                            padding: "8px",
                            borderRadius: "8px",
                            backgroundColor:
                                "#0F172A",
                            color: "white",
                            border:
                                "1px solid #334155"
                        }}
                    >

                        {
                            availableDevices.map(
                                (device) => (

                                    <option
                                        key={device}
                                        value={device}
                                    >
                                        {device}
                                    </option>
                                )
                            )
                        }

                    </select>

                    <select

                        value={
                            emiFilter
                        }

                        onChange={
                            (event) =>
                                setEmiFilter(
                                    event.target.value
                                )
                        }

                        style={{
                            padding: "8px",
                            borderRadius: "8px",
                            backgroundColor:
                                "#0F172A",
                            color: "white",
                            border:
                                "1px solid #334155"
                        }}
                    >

                        <option value="ALL">
                            ALL EVENTS
                        </option>

                        <option value="ALERT">
                            EMI ALERTS
                        </option>

                        <option value="NORMAL">
                            NORMAL
                        </option>

                    </select>
                    <button
                            onClick={exportCSV}
                            style={{
                                padding: "8px 14px",
                                backgroundColor: "#2563EB",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "bold"
                            }}
                        >
                        Export CSV
                    </button>
                </div>

            </div>
>>>>>>> feature5-v0.4-dashboard-enhancements

            <table
                style={{
                    width: "100%",
<<<<<<< HEAD
                    borderCollapse: "collapse",
=======
                    borderCollapse:
                        "collapse",
>>>>>>> feature5-v0.4-dashboard-enhancements
                    color: "white"
                }}
            >

                <thead>

                    <tr>

                        <th
                            style={{
<<<<<<< HEAD
                                textAlign: "left",
                                padding: "10px"
=======
                                textAlign:
                                    "left",
                                padding:
                                    "10px"
>>>>>>> feature5-v0.4-dashboard-enhancements
                            }}
                        >
                            Device
                        </th>

                        <th
                            style={{
<<<<<<< HEAD
                                textAlign: "left",
                                padding: "10px"
=======
                                textAlign:
                                    "left",
                                padding:
                                    "10px"
>>>>>>> feature5-v0.4-dashboard-enhancements
                            }}
                        >
                            Signal
                        </th>

                        <th
                            style={{
<<<<<<< HEAD
                                textAlign: "left",
                                padding: "10px"
=======
                                textAlign:
                                    "left",
                                padding:
                                    "10px"
>>>>>>> feature5-v0.4-dashboard-enhancements
                            }}
                        >
                            Score
                        </th>

                        <th
                            style={{
<<<<<<< HEAD
                                textAlign: "left",
                                padding: "10px"
=======
                                textAlign:
                                    "left",
                                padding:
                                    "10px"
>>>>>>> feature5-v0.4-dashboard-enhancements
                            }}
                        >
                            EMI
                        </th>

                        <th
                            style={{
<<<<<<< HEAD
                                textAlign: "left",
                                padding: "10px"
=======
                                textAlign:
                                    "left",
                                padding:
                                    "10px"
>>>>>>> feature5-v0.4-dashboard-enhancements
                            }}
                        >
                            Timestamp
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
<<<<<<< HEAD
                        [...telemetryHistory]
                            .reverse()
                            .slice(0, 100)
=======
                        [...filteredHistory]

                            .reverse()

                            .slice(0, 100)

>>>>>>> feature5-v0.4-dashboard-enhancements
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
<<<<<<< HEAD
                                                padding: "8px"
=======
                                                padding:
                                                    "8px"
>>>>>>> feature5-v0.4-dashboard-enhancements
                                            }}
                                        >
                                            {
                                                record.device_id
                                            }
                                        </td>

                                        <td
                                            style={{
<<<<<<< HEAD
                                                padding: "8px"
                                            }}
                                        >
                                            {
                                                record.signal_quality
=======
                                                padding:
                                                    "8px"
                                            }}
                                        >
                                            {
                                                Number(
                                                    record.signal_quality
                                                ).toFixed(
                                                    2
                                                )
>>>>>>> feature5-v0.4-dashboard-enhancements
                                            }
                                        </td>

                                        <td
                                            style={{
<<<<<<< HEAD
                                                padding: "8px"
                                            }}
                                        >
                                            {
                                                record.anomaly_score
=======
                                                padding:
                                                    "8px"
                                            }}
                                        >
                                            {
                                                Number(
                                                    record.anomaly_score
                                                ).toFixed(
                                                    2
                                                )
>>>>>>> feature5-v0.4-dashboard-enhancements
                                            }
                                        </td>

                                        <td
                                            style={{
<<<<<<< HEAD
                                                padding: "8px",
                                                color:
                                                    record.emi_detected
                                                    ? "#EF4444"
                                                    : "#22C55E"
=======
                                                padding:
                                                    "8px",

                                                color:
                                                    record.emi_detected
                                                    ? "#EF4444"
                                                    : "#22C55E",

                                                fontWeight:
                                                    "bold"
>>>>>>> feature5-v0.4-dashboard-enhancements
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
<<<<<<< HEAD
                                                padding: "8px"
                                            }}
                                        >
                                            {
                                                record.timestamp
=======
                                                padding:
                                                    "8px"
                                            }}
                                        >
                                            {
                                                new Date(
                                                    record.timestamp
                                                )
                                                .toISOString()
                                                .replace(
                                                    "T",
                                                    " "
                                                )
                                                .slice(
                                                    0,
                                                    19
                                                )
>>>>>>> feature5-v0.4-dashboard-enhancements
                                            }
                                        </td>

                                    </tr>
                                )
                            )
                    }

                </tbody>

            </table>

        </div>
<<<<<<< HEAD

=======
>>>>>>> feature5-v0.4-dashboard-enhancements
    );
}

export default TelemetryHistory;