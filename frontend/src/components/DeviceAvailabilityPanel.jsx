import React from "react";

function DeviceAvailabilityPanel({
    onlineDevices = [],
    offlineDevices = []
})
{
    return (

        <div
            style={{
                backgroundColor: "#1E293B",
                padding: "20px",
                borderRadius: "12px",
                boxShadow:
                    "0px 0px 10px rgba(0,0,0,0.4)"
            }}
        >

            <h3>
                Device Availability
            </h3>

            <div
                style={{
                    marginTop: "15px"
                }}
            >

                {
                    onlineDevices.map(
                        device => (

                            <div
                                key={device}
                                style={{
                                    color: "#22C55E",
                                    marginBottom: "8px"
                                }}
                            >
                                🟢 {device}
                            </div>
                        )
                    )
                }

                {
                    offlineDevices.map(
                        device => (

                            <div
                                key={device}
                                style={{
                                    color: "#EF4444",
                                    marginBottom: "8px"
                                }}
                            >
                                🔴 {device}
                            </div>
                        )
                    )
                }

            </div>

        </div>
    );
}

export default DeviceAvailabilityPanel;