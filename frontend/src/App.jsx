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
import TelemetryHistory
from "./components/TelemetryHistory";

import PlatformHealthCard
from "./components/PlatformHealthCard";
import DeviceAvailabilityPanel
from "./components/DeviceAvailabilityPanel";
import {
    fetchFleetAnalytics
}
from "./services/analyticsService";

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
    const [selectedDevice,
           setSelectedDevice] =
        useState("ALL");
    const [emiFilter,
       setEmiFilter] =
    useState("ALL");

    const [systemMetrics,
       setSystemMetrics] =
    useState({

        mqttStatus: "ONLINE",

        databaseStatus: "ONLINE",

        websocketClients: 1,

        messagesReceived: 0,

        startTime: Date.now()
    });

    const [onlineDevices, setOnlineDevices] = useState([]);
    const [offlineDevices, setOfflineDevices] = useState([]);

    const [

            fleetAnalytics,

            setFleetAnalytics

        ] = useState({

            average_signal: 0,

            average_anomaly: 0,

            active_alerts: 0,

            online_devices: 0,

            fleet_health: 100,

            total_records: 0
        });
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
                        "FULL TELEMETRY PAYLOAD",
                        JSON.stringify(
                            telemetryData,
                            null,
                            2
                        )
                    );
                    // =====================================
                    // CURRENT TELEMETRY
                    // =====================================

                    setTelemetry(
                        telemetryData
                    );
                    setOnlineDevices(
                            telemetryData.online_device_list || []
                        );
                    console.log(
                        "ONLINE DEVICE LIST:",
                        telemetryData.online_device_list
                    );

                    console.log(
                        "OFFLINE DEVICE LIST:",
                        telemetryData.offline_device_list
                    );

                    console.log(
                        "FLEET HEALTH:",
                        telemetryData.fleet_health
                    );
                    setOfflineDevices(
                            telemetryData.offline_device_list || []
                        );
                    setSystemMetrics(
                        previous => ({
                            ...previous,

                            messagesReceived:
                                previous.messagesReceived + 1
                        })
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

                            ].slice(-200)
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

    //======================================================
    //Analytics
    //======================================================

    useEffect(() =>
    {
        async function loadAnalytics()
        {
            try
            {
                const analytics =
                    await fetchFleetAnalytics();

                setFleetAnalytics(
                    analytics
                );
            }

            catch(error)
            {
                console.error(
                    error
                );
            }
        }

        loadAnalytics();

        const interval =
            setInterval(
                loadAnalytics,
                5000
            );

        return () =>
            clearInterval(
                interval
            );

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
    telemetry?.fleet_health || 100;

     
   const uptimeSeconds =

    Math.floor(

        (
            Date.now() -
            systemMetrics.startTime
        ) / 1000
    );

    const uptimeDisplay =

        `${Math.floor(
            uptimeSeconds / 3600
        )}h ${Math.floor(
            (uptimeSeconds % 3600) / 60
        )}m`;

    const totalRecords =
        telemetryHistory.length;

    const websocketClients =
        systemMetrics.websocketClients;

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

               <PlatformHealthCard

                    websocketStatus={
                        websocketStatus
                    }

                    systemMetrics={
                        systemMetrics
                    }

                    uptimeDisplay={
                        uptimeDisplay
                    }
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
                    title="Live Messages "
                    value={
                        systemMetrics.messagesReceived
                    }
                />

                <FleetStatCard
                    title="Database Records"
                    value={totalRecords}
                />

                <FleetStatCard
                    title="WebSocket Clients"
                    value={websocketClients}
                />

                <FleetStatCard
                    title="System Uptime"
                    value={uptimeDisplay}
                />

            </div>
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
                    title="Online Devices"
                    value={onlineDevices.length}
                />

                <FleetStatCard
                    title="Offline Devices"
                    value={offlineDevices.length}
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

                    <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr",
                        gap: "20px",
                        marginTop: "20px"
                    }}
                >


                    <div>

                        <DeviceAvailabilityPanel
                            onlineDevices={onlineDevices}
                            offlineDevices={offlineDevices}
                        />

                        <div
                            style={{
                                marginTop: "20px"
                            }}
                        >
                            <ActivityFeed
                                activityFeed={activityFeed}
                            />
                        </div>

                    </div>

                </div>

                </div>

            {/* ========================================= */}
            {/* TELEMETRY HISTORY */}
            {/* ========================================= */}

                <div
                    style={{
                        marginTop: "30px"
                    }}
                >

                   <TelemetryHistory

                        telemetryHistory={
                            telemetryHistory
                        }

                        selectedDevice={
                            selectedDevice
                        }

                        setSelectedDevice={
                            setSelectedDevice
                        }

                        emiFilter={
                            emiFilter
                        }

                        setEmiFilter={
                            setEmiFilter
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