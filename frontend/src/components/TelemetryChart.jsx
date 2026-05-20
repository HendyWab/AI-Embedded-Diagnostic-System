// =========================================================
//
// Intelligent Embedded Diagnostic System (IEDS)
// Real-Time Telemetry Chart Component
//
// File: TelemetryChart.jsx
//
// Description:
// Renders real-time telemetry analytics using Recharts.
//
// Features:
// - Live telemetry plotting
// - Signal quality visualization
// - Anomaly score visualization
// - EMI threshold indication
// - Responsive observability chart
// - WebSocket/MQTT telemetry rendering
//
// =========================================================


/* ========================================================
 * REACT IMPORTS
 * ====================================================== */

import React from "react";


/* ========================================================
 * RECHARTS IMPORTS
 * ====================================================== */

import
{
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine
}
from "recharts";


/* ========================================================
 * TELEMETRY CHART COMPONENT
 * ====================================================== */

function TelemetryChart(
{
    telemetryHistory
})
{

    /* ====================================================
     * DATA NORMALIZATION
     * ================================================== */
    /*
     * Converts raw telemetry payloads
     * into chart-compatible data.
     */

    const chartData =
        telemetryHistory.map(
            (item) =>
            ({
                time:
                new Date(
                    item.timestamp
                ).toLocaleTimeString(),

                /*
                 * Scale anomaly score
                 * from 0-1 to percentage.
                 */

                anomaly:
                item.anomaly_score * 100,

                signal:
                item.signal_quality,

                emi:
                item.emi_detected
            })
        );


    /* ====================================================
     * COMPONENT UI
     * ================================================== */

    return (

        <div

            style={{
                backgroundColor:
                    "#1E293B",

                padding:
                    "20px",

                borderRadius:
                    "12px",

                marginTop:
                    "20px",

                boxShadow:
                    "0px 0px 10px rgba(0,0,0,0.4)"
            }}
        >


            {/* ========================================= */}
            {/* RESPONSIVE CHART CONTAINER */}
            {/* ========================================= */}

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <LineChart
                    data={chartData}
                >


                    {/* ================================= */}
                    {/* GRID */}
                    {/* ================================= */}

                    <CartesianGrid

                        strokeDasharray="3 3"

                        stroke="#64748B"
                    />


                    {/* ================================= */}
                    {/* X AXIS */}
                    {/* ================================= */}

                    <XAxis

                        dataKey="time"

                        stroke="#CBD5E1"
                    />


                    {/* ================================= */}
                    {/* Y AXIS */}
                    {/* ================================= */}

                    <YAxis

                        stroke="#CBD5E1"

                        domain={[0, 100]}
                    />


                    {/* ================================= */}
                    {/* TOOLTIP */}
                    {/* ================================= */}

                    <Tooltip />


                    {/* ================================= */}
                    {/* ANOMALY THRESHOLD */}
                    {/* ================================= */}

                    <ReferenceLine

                        y={70}

                        stroke="#EF4444"

                        strokeDasharray="5 5"

                        label="Anomaly Threshold"
                    />


                    {/* ================================= */}
                    {/* SIGNAL QUALITY LINE */}
                    {/* ================================= */}

                    <Line

                        type="monotone"

                        dataKey="signal"

                        name="Signal Quality"

                        stroke="#4ECDC4"

                        strokeWidth={3}

                        dot={{
                            r: 4
                        }}

                        activeDot={{
                            r: 7
                        }}
                    />


                    {/* ================================= */}
                    {/* ANOMALY SCORE LINE */}
                    {/* ================================= */}

                    <Line

                        type="monotone"

                        dataKey="anomaly"

                        name="Anomaly Score"

                        stroke="#FF6B6B"

                        strokeWidth={3}

                        dot={{
                            r: 4
                        }}

                        activeDot={{
                            r: 7
                        }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    );
}


/* ========================================================
 * EXPORT
 * ====================================================== */

export default TelemetryChart;