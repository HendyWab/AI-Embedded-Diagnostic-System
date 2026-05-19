import React, {
    useEffect,
    useState
}
from "react";

import axios
from "axios";

import TelemetryChart
from "./components/TelemetryChart";

import {
    connectWebSocket
}
from "./services/websocket";

import "./App.css";


function App()
{
    // =====================================
    // STATES
    // =====================================

    const [telemetry, setTelemetry] =
        useState(null);

    const [history, setHistory] =
        useState([]);

    const [connected, setConnected] =
        useState(false);


    // =====================================
    // INITIAL FETCH
    // =====================================

    useEffect(() =>
    {
        fetchInitialTelemetry();

        fetchHistory();

    }, []);


    // =====================================
    // WEBSOCKET CONNECTION
    // =====================================

    useEffect(() =>
    {
        connectWebSocket(
            (telemetryData) =>
            {
                setConnected(true);

                setTelemetry(
                    telemetryData
                );

                setHistory((prev) =>
                {
                    const updated =
                    [
                        ...prev,
                        telemetryData
                    ];

                    return updated.slice(-20);
                });
            }
        );

    }, []);


    // =====================================
    // FETCH LATEST TELEMETRY
    // =====================================

    async function fetchInitialTelemetry()
    {
        try
        {
            const response =
                await axios.get(
                    "http://localhost:8000/telemetry/latest"
                );

            if (
                response.data.device_id
            )
            {
                setTelemetry(
                    response.data
                );
            }
        }
        catch (error)
        {
            console.error(
                "Initial telemetry fetch error:",
                error
            );
        }
    }


    // =====================================
    // FETCH HISTORY
    // =====================================

    async function fetchHistory()
    {
        try
        {
            const response =
                await axios.get(
                    "http://localhost:8000/telemetry/history"
                );

            setHistory(
                response.data
            );
        }
        catch (error)
        {
            console.error(
                "Telemetry history fetch error:",
                error
            );
        }
    }


    // =====================================
    // LOADING STATE
    // =====================================

    if (!telemetry)
    {
        return (

            <div className="app">

                <h1>
                    Intelligent Embedded Diagnostic System
                </h1>

                <p>
                    Waiting for telemetry...
                </p>

            </div>
        );
    }


    // =====================================
    // MAIN UI
    // =====================================

    return (

        <div className="app">

            <h1>
                Intelligent Embedded Diagnostic System
            </h1>


            {/* ================================= */}
            {/* DASHBOARD */}
            {/* ================================= */}

            <div className="dashboard-grid">


                {/* ============================= */}
                {/* TELEMETRY CARD */}
                {/* ============================= */}

                <div
                    className={
                        telemetry.emi_detected
                        ? "card alert-card"
                        : "card"
                    }
                >

                    <h2>
                        Telemetry Overview
                    </h2>

                    {
                        telemetry.emi_detected &&
                        (
                            <div className="alert-banner">

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
                            {
                                telemetry.emi_detected
                                ? "true"
                                : "false"
                            }
                        </strong>
                    </p>

                </div>


                {/* ============================= */}
                {/* DEVICE STATUS */}
                {/* ============================= */}

                <div className="card">

                    <h2>
                        Device Status
                    </h2>

                    <p>
                        Registered Devices:
                        <strong>
                            {" "}1
                        </strong>
                    </p>

                    <p>
                        Backend Status:
                        <strong>
                            {" "}operational
                        </strong>
                    </p>

                    <p>
                        WebSocket:
                        <strong>
                            {" "}
                            {
                                connected
                                ? "connected"
                                : "disconnected"
                            }
                        </strong>
                    </p>

                </div>

            </div>


            {/* ================================= */}
            {/* CHART */}
            {/* ================================= */}

            <div className="chart-card">

                <h2>
                    Live Telemetry Analytics
                </h2>

                <TelemetryChart
                    telemetryHistory={history}
                />

            </div>

        </div>
    );
}

export default App;