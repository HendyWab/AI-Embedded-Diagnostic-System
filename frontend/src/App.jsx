// =========================================================
//
// Intelligent Embedded Diagnostic System (IEDS)
// Professional Observability Dashboard
//
// Author: HendyWab
//
// Description:
// Real-time telemetry observability platform.
//
// Features:
// - Real-time WebSocket telemetry
// - Historical telemetry preload
// - Fleet monitoring
// - KPI analytics
// - Activity feed
// - Live telemetry charts
// - Multi-device observability
//
// =========================================================


// =========================================================
// IMPORTS
// =========================================================

import React,
{
    useEffect,
    useState
}
from "react";

import "./App.css";

import DeviceStatusCard
from "./components/DeviceStatusCard";

import TelemetryCard
from "./components/TelemetryCard";

import TelemetryChart
from "./components/TelemetryChart";

import FleetDeviceCard
from "./components/FleetDeviceCard";

import FleetStatCard
from "./components/FleetStatCard";

import ActivityFeed
from "./components/ActivityFeed";

import
{
    connectWebSocket
}
from "./services/websocket";

import
{
    fetchTelemetryHistory
}
from "./services/api";


// =========================================================
// COMPONENT
// =========================================================

function App()
{

    // =====================================================
    // STATE
    // =====================================================

    const [telemetry,
           setTelemetry] =
        useState(null);

    const [devices,
           setDevices] =
        useState({});

    const [telemetryHistory,
           setTelemetryHistory] =
        useState([]);

    const [activityFeed,
           setActivityFeed] =
        useState([]);

    const [websocketStatus,
           setWebsocketStatus] =
        useState("disconnected");


    // =====================================================
    // WEBSOCKET CONNECTION
    // =====================================================

    useEffect(() =>
    {

        const socket =
            connectWebSocket(

                // =========================================
                // ON MESSAGE
                // =========================================

                (telemetryData) =>
                {

                    console.log(
                        "Telemetry received:",
                        telemetryData
                    );

                    // =====================================
                    // CURRENT TELEMETRY
                    // =====================================

                    setTelemetry(
                        telemetryData
                    );


                    // =====================================
                    // DEVICE REGISTRY
                    // =====================================

                    setDevices(
                        (previousDevices) =>
                        ({
                            ...previousDevices,

                            [
                                telemetryData.device_id
                            ]:
                            telemetryData
                        })
                    );


                    // =====================================
                    // TELEMETRY HISTORY
                    // =====================================

                    setTelemetryHistory(
                        (previousHistory) =>
                        [

                            ...previousHistory,

                            telemetryData

                        ].slice(-30)
                    );


                    // =====================================
                    // ACTIVITY FEED
                    // =====================================

                    setActivityFeed(
                        (previousFeed) =>
                        [

                            telemetryData,

                            ...previousFeed

                        ].slice(0, 20)
                    );
                },


                // =========================================
                // ON CONNECT
                // =========================================

                () =>
                {

                    console.log(
                        "WebSocket connected"
                    );

                    setWebsocketStatus(
                        "connected"
                    );
                },


                // =========================================
                // ON DISCONNECT
                // =========================================

                () =>
                {

                    console.log(
                        "WebSocket disconnected"
                    );

                    setWebsocketStatus(
                        "disconnected"
                    );
                }
            );


        // ================================================
        // CLEANUP
        // ================================================

        return () =>
        {

            socket.close();
        };

    }, []);


    // =====================================================
    // LOAD TELEMETRY HISTORY
    // =====================================================

    useEffect(() =>
    {

        async function loadHistory()
        {

            try
            {

                const history =
                    await fetchTelemetryHistory();

                // =========================================
                // VALIDATE RESPONSE
                // =========================================

                if(
                    !history ||
                    !Array.isArray(history)
                )
                {

                    console.warn(
                        "No telemetry history available."
                    );

                    return;
                }


                // =========================================
                // ORDER HISTORY
                // =========================================

                const orderedHistory =
                    [...history].reverse();


                // =========================================
                // LOAD HISTORY
                // =========================================

                setTelemetryHistory(
                    orderedHistory
                );


                // =========================================
                // LOAD ACTIVITY FEED
                // =========================================

                setActivityFeed(

                    orderedHistory
                        .slice(-20)
                        .reverse()
                );


                // =========================================
                // REBUILD DEVICE REGISTRY
                // =========================================

                const rebuiltDevices = {};

                orderedHistory.forEach(
                    (entry) =>
                    {

                        rebuiltDevices[
                            entry.device_id
                        ] = entry;
                    }
                );

                setDevices(
                    rebuiltDevices
                );


                // =========================================
                // LOAD CURRENT TELEMETRY
                // =========================================

                if(
                    orderedHistory.length > 0
                )
                {

                    setTelemetry(

                        orderedHistory[
                            orderedHistory.length - 1
                        ]
                    );
                }


                console.log(
                    "Telemetry history loaded successfully."
                );
            }

            catch(error)
            {

                console.error(
                    "History load failed:",
                    error
                );
            }
        }

        loadHistory();

    }, []);


    // =====================================================
    // DERIVED METRICS
    // =====================================================

    const deviceList =
        Object.values(devices || {});


    // =====================================================
    // ACTIVE ALERTS
    // =====================================================

    const activeAlerts =
        deviceList.filter(
            (device) =>
                device.emi_detected
        ).length;


    // =====================================================
    // AVERAGE SIGNAL
    // =====================================================

    const averageSignal =
        deviceList.length > 0

        ?

        (
            deviceList.reduce(
                (
                    total,
                    device
                ) =>

                    total +
                    device.signal_quality,

                0
            ) / deviceList.length
        ).toFixed(1)

        :

        "0";


    // =====================================================
    // FLEET HEALTH
    // =====================================================

    const fleetHealth =
        deviceList.length > 0

        ?

        (
            (
                deviceList.filter(
                    (device) =>
                        !device.emi_detected
                ).length

                /

                deviceList.length
            ) * 100
        ).toFixed(0)

        :

        "0";


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div
            style={{
                backgroundColor: "#020617",

                minHeight: "100vh",

                padding: "20px",

                color: "white"
            }}
        >

            {/* ========================================= */}
            {/* TITLE */}
            {/* ========================================= */}

            <h1
                style={{
                    textAlign: "center",

                    marginBottom: "40px",

                    fontSize: "52px"
                }}
            >
                Intelligent Embedded Diagnostic System
            </h1>


            {/* ========================================= */}
            {/* TOP CARDS */}
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

                <TelemetryCard
                    telemetry={telemetry}
                />

                <DeviceStatusCard
                    websocketStatus={
                        websocketStatus
                    }

                    devices={devices}
                />

            </div>


            {/* ========================================= */}
            {/* KPI CARDS */}
            {/* ========================================= */}

            <div
                style={{
                    display: "grid",

                    gridTemplateColumns:
                        "repeat(4, 1fr)",

                    gap: "20px",

                    marginBottom: "40px"
                }}
            >

                <FleetStatCard
                    title="Connected Devices"
                    value={deviceList.length}
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
            {/* FLEET DEVICES */}
            {/* ========================================= */}

            <h2
                style={{
                    marginBottom: "20px"
                }}
            >
                Active Fleet Devices
            </h2>

            <div
                style={{
                    display: "grid",

                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(350px, 1fr))",

                    gap: "20px",

                    marginBottom: "40px"
                }}
            >

                {
                    deviceList.map(
                        (device) => (

                            <FleetDeviceCard
                                key={
                                    device.device_id
                                }

                                device={device}
                            />
                        )
                    )
                }

            </div>


            {/* ========================================= */}
            {/* ANALYTICS + FEED */}
            {/* ========================================= */}

            <div
                style={{
                    display: "grid",

                    gridTemplateColumns:
                        "2fr 1fr",

                    gap: "20px",

                    alignItems: "start"
                }}
            >

                {/* ===================================== */}
                {/* TELEMETRY CHART */}
                {/* ===================================== */}

                <div
                    style={{
                        backgroundColor: "#1E293B",

                        padding: "20px",

                        borderRadius: "12px",

                        boxShadow:
                            "0px 0px 10px rgba(0,0,0,0.4)"
                    }}
                >

                    <h2
                        style={{
                            marginBottom: "20px"
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


                {/* ===================================== */}
                {/* ACTIVITY FEED */}
                {/* ===================================== */}

                <ActivityFeed
                    activityFeed={
                        activityFeed
                    }
                />

            </div>

        </div>
    );
}


// =========================================================
// EXPORT
// =========================================================

export default App;