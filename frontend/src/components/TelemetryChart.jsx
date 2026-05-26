// =========================================================
//
// Intelligent Embedded Diagnostic System (IEDS)
// Telemetry Analytics Chart
//
// Author: HendyWab
//
// Description:
// Real-time telemetry visualization.
//
// Features:
// - Signal quality monitoring
// - Anomaly score tracking
// - Threshold visualization
// - Live telemetry updates
//
// =========================================================


/* ========================================================
 * IMPORTS
 * ====================================================== */

import React
from "react";

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
 * COMPONENT
 * ====================================================== */

function TelemetryChart(
{
    telemetryHistory
})
{

    /* ====================================================
     * SAFETY CHECK
     * ================================================== */

    if(
        !telemetryHistory ||
        telemetryHistory.length === 0
    )
    {
        return (

            <div
                style={{
                    color: "white",
                    padding: "20px"
                }}
            >
                Waiting for telemetry history...
            </div>
        );
    }


    /* ====================================================
     * FORMAT CHART DATA
     * ================================================== */

    const chartData =
        telemetryHistory.map(
            (entry) =>
            ({
                time:
                    new Date(
                        entry.timestamp
                    ).toLocaleTimeString(),

                signal_quality:
                    entry.signal_quality,

                anomaly_score:
                    entry.anomaly_score * 100
            })
        );


    /* ====================================================
     * RENDER
     * ================================================== */

    return (

        <div
            style={{
                width: "100%",
                height: "350px"
            }}
        >

            <ResponsiveContainer>

                <LineChart
                    data={chartData}
                >

                    {/* ============================= */}
                    {/* GRID */}
                    {/* ============================= */}

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#475569"
                    />


                    {/* ============================= */}
                    {/* AXES */}
                    {/* ============================= */}

                    <XAxis
                        dataKey="time"
                        stroke="#CBD5E1"
                    />

                    <YAxis
                        stroke="#CBD5E1"
                    />


                    {/* ============================= */}
                    {/* TOOLTIP */}
                    {/* ============================= */}

                    <Tooltip />


                    {/* ============================= */}
                    {/* THRESHOLD */}
                    {/* ============================= */}

                    <ReferenceLine
                        y={70}
                        stroke="#EF4444"
                        strokeDasharray="5 5"
                        label="Anomaly Threshold"
                    />


                    {/* ============================= */}
                    {/* SIGNAL QUALITY */}
                    {/* ============================= */}

                    <Line
                        type="monotone"
                        dataKey="signal_quality"
                        stroke="#4ADE80"
                        strokeWidth={3}
                    />


                    {/* ============================= */}
                    {/* ANOMALY SCORE */}
                    {/* ============================= */}

                    <Line
                        type="monotone"
                        dataKey="anomaly_score"
                        stroke="#F87171"
                        strokeWidth={3}
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