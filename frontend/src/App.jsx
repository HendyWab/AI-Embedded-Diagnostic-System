// =========================================================
//
// Intelligent Embedded Diagnostic System (IEDS)
// Fleet Observability Dashboard
//
// Author: HendyWab
//
// Description:
// Main real-time frontend dashboard
// for distributed telemetry monitoring.
//
// Features:
// - Live WebSocket telemetry
// - Fleet observability
// - EMI anomaly visualization
// - Device monitoring
// - Real-time analytics
// - Fleet statistics
// - Activity feed
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

import TelemetryCard
from "./components/TelemetryCard";

import DeviceStatusCard
from "./components/DeviceStatusCard";

import TelemetryChart
from "./components/TelemetryChart";

import FleetStatCard
from "./components/FleetStatCard";

import FleetDeviceCard
from "./components/FleetDeviceCard";

import ActivityFeed
from "./components/ActivityFeed";


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
 * MAIN APP
 * ====================================================== */

function App()
{

    /* ====================================================
     * STATES
     * ================================================== */

    const [
        telemetry,
        setTelemetry
    ] = useState(null);

    const [
        telemetryHistory,
        setTelemetryHistory
    ] = useState([]);

    const [
        devices,
        setDevices
    ] = useState({});

    const [
        wsConnected,
        setWsConnected
    ] = useState(false);

    const [
        activityFeed,
        setActivityFeed
    ] = useState([]);


    /* ====================================================
     * WEBSOCKET INIT
     * ================================================== */

    useEffect(() =>
    {

        const socket =
            connectWebSocket(

                /* ========================================
                 * ON MESSAGE
                 * ====================================== */

                (incomingTelemetry) =>
                {

                    console.log(
                        "Telemetry received:",
                        incomingTelemetry
                    );


                    /* ====================================
                     * UPDATE CURRENT TELEMETRY
                     * ================================== */

                    setTelemetry(
                        incomingTelemetry
                    );


                    /* ====================================
                     * UPDATE HISTORY
                     * ================================== */

                    setTelemetryHistory(
                        (prevHistory) =>
                        {

                            const updated =
                            [
                                ...prevHistory,
                                incomingTelemetry
                            ];

                            return updated.slice(-20);
                        }
                    );


                    /* ====================================
                     * UPDATE DEVICE REGISTRY
                     * ================================== */

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


                    /* ====================================
                     * UPDATE ACTIVITY FEED
                     * ================================== */

                    setActivityFeed(
                        (prevFeed) =>
                        {

                            const updated =
                            [
                                incomingTelemetry,
                                ...prevFeed
                            ];

                            return updated.slice(0, 15);
                        }
                    );
                },


                /* ========================================
                 * ON CONNECT
                 * ====================================== */

                () =>
                {

                    console.log(
                        "WebSocket connected"
                    );

                    setWsConnected(true);
                },


                /* ========================================
                 * ON DISCONNECT
                 * ====================================== */

                () =>
                {

                    console.log(
                        "WebSocket disconnected"
                    );

                    setWsConnected(false);
                }
            );


        /* ================================================
         * CLEANUP
         * ============================================== */

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
     * FLEET METRICS
     * ================================================== */

    const fleetDevices =
        Object.values(devices);

    const totalDevices =
        fleetDevices.length;

    const activeAlerts =
        fleetDevices.filter(
            (device) =>
                device.emi_detected
        ).length;

    const averageSignal =
        totalDevices > 0
        ?
        (
            fleetDevices.reduce(
                (
                    total,
                    device
                ) =>
                    total +
                    device.signal_quality,
                0
            ) / totalDevices
        ).toFixed(1)
        :
        "0";

    const fleetHealth =
        totalDevices > 0
        ?
        (
            (
                (
                    totalDevices -
                    activeAlerts
                ) /
                totalDevices
            ) * 100
        ).toFixed(0)
        :
        "100";


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
                    "Arial",

                color:
                    "white"
            }}
        >

            {/* ========================================= */}
            {/* TITLE */}
            {/* ========================================= */}

            <h1

                style={{
                    textAlign:
                        "center",

                    marginBottom:
                        "40px"
                }}
            >
                Intelligent Embedded Diagnostic System
            </h1>


            {/* ========================================= */}
            {/* TOP GRID */}
            {/* ========================================= */}

            <div

                style={{
                    display:
                        "grid",

                    gridTemplateColumns:
                        "1fr 1fr",

                    gap:
                        "20px",

                    marginBottom:
                        "30px"
                }}
            >

                <TelemetryCard
                    telemetry={telemetry}
                />

                <DeviceStatusCard
                    connected={wsConnected}
                    devices={fleetDevices}
                />

            </div>


            {/* ========================================= */}
            {/* FLEET STATS */}
            {/* ========================================= */}

            <div

                style={{
                    display:
                        "grid",

                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(250px, 1fr))",

                    gap:
                        "20px",

                    marginBottom:
                        "30px"
                }}
            >

                <FleetStatCard
                    title="Connected Devices"
                    value={totalDevices}
                />

                <FleetStatCard
                    title="Active EMI Alerts"
                    value={activeAlerts}
                />

                <FleetStatCard
                    title="Average Signal"
                    value={averageSignal}
                />

                <FleetStatCard
                    title="Fleet Health"
                    value={`${fleetHealth}%`}
                />

            </div>


            {/* ========================================= */}
            {/* DEVICE GRID */}
            {/* ========================================= */}

            <h2

                style={{
                    marginBottom:
                        "20px"
                }}
            >
                Active Fleet Devices
            </h2>

            <div

                style={{
                    display:
                        "grid",

                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(300px, 1fr))",

                    gap:
                        "20px",

                    marginBottom:
                        "30px"
                }}
            >

                {
                    fleetDevices.map(
                        (
                            device,
                            index
                        ) => (

                            <FleetDeviceCard
                                key={index}
                                device={device}
                            />
                        )
                    )
                }

            </div>


            {/* ========================================= */}
            {/* TELEMETRY ANALYTICS */}
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
                        "0px 0px 15px rgba(0,0,0,0.4)",

                    marginBottom:
                        "30px"
                }}
            >

                <h2

                    style={{
                        marginBottom:
                            "20px"
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


            {/* ========================================= */}
            {/* ACTIVITY FEED */}
            {/* ========================================= */}

            <ActivityFeed
                activityFeed={activityFeed}
            />

        </div>
    );
}


/* ========================================================
 * EXPORT
 * ====================================================== */

export default App;