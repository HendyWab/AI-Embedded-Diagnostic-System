// =========================================================
//
// Intelligent Embedded Diagnostic System (IEDS)
// Fleet Observability Dashboard
//
// File: App.jsx
//
// Description:
// Main frontend dashboard for the Intelligent
// Embedded Diagnostic System.
//
// Features:
// - Multi-device observability
// - Real-time telemetry streaming
// - Fleet monitoring
// - EMI anomaly visualization
// - Live WebSocket telemetry updates
// - Device health monitoring
//
// =========================================================


/* ========================================================
 * REACT IMPORTS
 * ====================================================== */

import React,
{
    useEffect,
    useState
}
from "react";


/* ========================================================
 * COMPONENT IMPORTS
 * ====================================================== */

import TelemetryChart
from "./components/TelemetryChart";


/* ========================================================
 * SERVICE IMPORTS
 * ====================================================== */

import
{
    connectWebSocket
}
from "./services/websocket";


/* ========================================================
 * STYLE IMPORTS
 * ====================================================== */

import "./App.css";


/* ========================================================
 * MAIN APP COMPONENT
 * ====================================================== */

function App()
{

    /* ====================================================
     * STATE MANAGEMENT
     * ================================================== */

    /*
     * Latest telemetry payload.
     */

    const [
        telemetry,
        setTelemetry
    ] = useState(null);


    /*
     * Telemetry history buffer.
     */

    const [
        telemetryHistory,
        setTelemetryHistory
    ] = useState([]);


    /*
     * Active fleet registry.
     */

    const [
        devices,
        setDevices
    ] = useState({});


    /*
     * WebSocket connection status.
     */

    const [
        wsConnected,
        setWsConnected
    ] = useState(false);


    /* ====================================================
     * WEBSOCKET INITIALIZATION
     * ================================================== */

    useEffect(() =>
    {

        const socket =
            connectWebSocket(

                /*
                 * ON MESSAGE
                 */

                (incomingTelemetry) =>
                {

                    console.log(
                        "Telemetry received:",
                        incomingTelemetry
                    );


                    /* ================================
                     * UPDATE LATEST TELEMETRY
                     * ============================== */

                    setTelemetry(
                        incomingTelemetry
                    );


                    /* ================================
                     * UPDATE CHART HISTORY
                     * ============================== */

                    setTelemetryHistory(
                        (prevHistory) =>
                        {

                            const updated =
                            [
                                ...prevHistory,
                                incomingTelemetry
                            ];

                            /*
                             * Keep latest 20 points.
                             */

                            return updated.slice(-20);
                        }
                    );


                    /* ================================
                     * UPDATE DEVICE REGISTRY
                     * ============================== */

                    setDevices(
                        (prevDevices) =>
                        ({

                            ...prevDevices,

                            [
                                incomingTelemetry.device_id
                            ]:
                            incomingTelemetry
                        })
                    );


                    setWsConnected(true);
                },


                /*
                 * ON CONNECT
                 */

                () =>
                {
                    console.log(
                        "WebSocket connected"
                    );

                    setWsConnected(true);
                },


                /*
                 * ON DISCONNECT
                 */

                () =>
                {
                    console.log(
                        "WebSocket disconnected"
                    );

                    setWsConnected(false);
                }
            );


        /*
         * Cleanup.
         */

        return () =>
        {
            socket.close();
        };

    }, []);


    /* ====================================================
     * LOADING STATE
     * ================================================== */

    if(!telemetry)
    {
        return (

            <div
                style={{
                    color: "white",
                    padding: "40px",
                    backgroundColor: "#020617",
                    height: "100vh"
                }}
            >
                Waiting for telemetry...
            </div>
        );
    }


    /* ====================================================
     * MAIN UI
     * ================================================== */

    return (

        <div

            style={{
                backgroundColor:
                    "#020617",

                minHeight:
                    "100vh",

                padding:
                    "20px",

                fontFamily:
                    "Arial"
            }}
        >

            {/* ========================================= */}
            {/* TITLE */}
            {/* ========================================= */}

            <h1

                style={{
                    color: "white",
                    textAlign: "center",
                    marginBottom: "40px"
                }}
            >
                Intelligent Embedded Diagnostic System
            </h1>


            {/* ========================================= */}
            {/* TOP GRID */}
            {/* ========================================= */}

            <div

                style={{
                    display: "grid",

                    gridTemplateColumns:
                        "1fr 1fr",

                    gap: "20px",

                    marginBottom: "30px"
                }}
            >


                {/* ===================================== */}
                {/* TELEMETRY OVERVIEW */}
                {/* ===================================== */}

                <div

                    style={{
                        backgroundColor:
                            telemetry.emi_detected
                                ? "#7F1D1D"
                                : "#1E293B",

                        border:
                            telemetry.emi_detected
                                ? "2px solid #EF4444"
                                : "none",

                        color:
                            "white",

                        padding:
                            "25px",

                        borderRadius:
                            "16px",

                        boxShadow:
                            "0px 0px 15px rgba(0,0,0,0.4)"
                    }}
                >

                    <h2>
                        Telemetry Overview
                    </h2>


                    {/* EMI ALERT */}

                    {
                        telemetry.emi_detected &&
                        (
                            <div

                                style={{
                                    backgroundColor:
                                        "#FF4D4D",

                                    padding:
                                        "12px",

                                    borderRadius:
                                        "10px",

                                    marginBottom:
                                        "20px",

                                    fontWeight:
                                        "bold"
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
                            {
                                telemetry.emi_detected
                                    ? "true"
                                    : "false"
                            }
                        </strong>
                    </p>

                </div>


                {/* ===================================== */}
                {/* DEVICE STATUS */}
                {/* ===================================== */}

                <div

                    style={{
                        backgroundColor:
                            "#1E293B",

                        color:
                            "white",

                        padding:
                            "25px",

                        borderRadius:
                            "16px",

                        boxShadow:
                            "0px 0px 15px rgba(0,0,0,0.4)"
                    }}
                >

                    <h2>
                        Device Status
                    </h2>

                    <p>
                        Registered Devices:
                        <strong>
                            {" "}
                            {
                                Object.keys(
                                    devices
                                ).length
                            }
                        </strong>
                    </p>

                    <p>
                        Backend Status:
                        <strong>
                            {" "}
                            operational
                        </strong>
                    </p>

                    <p>
                        WebSocket:
                        <strong>
                            {" "}
                            {
                                wsConnected
                                    ? "connected"
                                    : "disconnected"
                            }
                        </strong>
                    </p>

                </div>

            </div>


            {/* ========================================= */}
            {/* FLEET DEVICE GRID */}
            {/* ========================================= */}

            <div

                style={{
                    marginBottom: "30px"
                }}
            >

                <h2
                    style={{
                        color: "white",
                        marginBottom: "20px"
                    }}
                >
                    Active Fleet Devices
                </h2>


                <div

                    style={{
                        display: "grid",

                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(250px, 1fr))",

                        gap: "20px"
                    }}
                >

                    {
                        Object.values(devices)
                        .map((device) =>
                        (

                            <div

                                key={
                                    device.device_id
                                }

                                style={{
                                    backgroundColor:
                                        device.emi_detected
                                            ? "#7F1D1D"
                                            : "#1E293B",

                                    border:
                                        device.emi_detected
                                            ? "2px solid #EF4444"
                                            : "1px solid #334155",

                                    color:
                                        "white",

                                    padding:
                                        "20px",

                                    borderRadius:
                                        "14px"
                                }}
                            >

                                <h3>
                                    {
                                        device.device_id
                                    }
                                </h3>

                                <p>
                                    Signal:
                                    <strong>
                                        {" "}
                                        {
                                            device.signal_quality
                                        }
                                    </strong>
                                </p>

                                <p>
                                    Anomaly:
                                    <strong>
                                        {" "}
                                        {
                                            device.anomaly_score
                                        }
                                    </strong>
                                </p>

                                <p>
                                    EMI:
                                    <strong>
                                        {" "}
                                        {
                                            device.emi_detected
                                                ? "ALERT"
                                                : "NORMAL"
                                        }
                                    </strong>
                                </p>

                            </div>
                        ))
                    }

                </div>

            </div>


            {/* ========================================= */}
            {/* TELEMETRY CHART */}
            {/* ========================================= */}

            <div

                style={{
                    backgroundColor:
                        "#1E293B",

                    padding:
                        "20px",

                    borderRadius:
                        "16px",

                    boxShadow:
                        "0px 0px 15px rgba(0,0,0,0.4)"
                }}
            >

                <h2
                    style={{
                        color: "white"
                    }}
                >
                    Live Telemetry Analytics
                </h2>

                <TelemetryChart
                    telemetryHistory={
                        telemetryHistory
                    }
                />

            </div>

        </div>
    );
}


/* ========================================================
 * EXPORT
 * ====================================================== */

export default App;