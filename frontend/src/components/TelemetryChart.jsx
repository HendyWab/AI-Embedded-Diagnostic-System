import React,
{
    useEffect,
    useState
}
from "react";

import
{
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
}
from "recharts";

import
{
    fetchLatestTelemetry
}
from "../services/api";

function TelemetryChart()
{
    const [chartData,
           setChartData] =
        useState([]);

    useEffect(() =>
    {
        async function updateChart()
        {
            const telemetry =
                await fetchLatestTelemetry();

            if(
                telemetry &&
                telemetry.status !==
                "no_telemetry_available"
            )
            {
                setChartData(prevData =>
                {
                    const updated =
                    [
                        ...prevData,

                        {
                            time:
                            new Date()
                            .toLocaleTimeString(),

                            anomaly:
                            telemetry.anomaly_score,

                            signal:
                            telemetry.signal_quality
                        }
                    ];

                    /*
                     * Keep last 10 points.
                     */
                    return updated.slice(-10);
                });
            }
        }

        /*
         * Initial fetch.
         */
        updateChart();

        /*
         * Refresh every 3 seconds.
         */
        const interval =
            setInterval(
                updateChart,
                3000
            );

        return () =>
            clearInterval(interval);

    }, []);

    return (
        <div
            style={{
                backgroundColor: "#1E293B",
                padding: "20px",
                borderRadius: "12px",
                marginTop: "20px",
                boxShadow:
                    "0px 0px 10px rgba(0,0,0,0.4)"
            }}
        >
            <h2>
                Live Telemetry Analytics
            </h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >
                <LineChart
                    data={chartData}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                    />

                    <XAxis dataKey="time" />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="anomaly"
                        stroke="#FF6B6B"
                        strokeWidth={3}
                    />

                    <Line
                        type="monotone"
                        dataKey="signal"
                        stroke="#4ECDC4"
                        strokeWidth={3}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default TelemetryChart;
