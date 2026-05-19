import React from "react";

import TelemetryCard
from "./components/TelemetryCard";

import DeviceStatusCard
from "./components/DeviceStatusCard";

import TelemetryChart
from "./components/TelemetryChart";

function App()
{
    return (
        <div
            style={{
                backgroundColor: "#0F172A",

                minHeight: "100vh",

                padding: "40px",

                color: "#FFFFFF",

                fontFamily: "Arial"
            }}
        >
            <h1
                style={{
                    textAlign: "center",

                    marginBottom: "40px"
                }}
            >
                Intelligent Embedded Diagnostic System
            </h1>

            <div
                style={{
                    display: "grid",

                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(300px, 1fr))",

                    gap: "20px"
                }}
            >
                <TelemetryCard />

                <DeviceStatusCard />
            </div>

            <TelemetryChart />
        </div>
    );
}

export default App;