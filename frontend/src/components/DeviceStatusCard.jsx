import React,
{
    useEffect,
    useState
}
from "react";

import
{
    fetchDeviceStatus
}
from "../services/api";

function DeviceStatusCard()
{
    const [deviceStatus,
           setDeviceStatus] =
        useState(null);

    useEffect(() =>
    {
        async function loadDeviceStatus()
        {
            const data =
                await fetchDeviceStatus();

            setDeviceStatus(data);
        }

        loadDeviceStatus();

    }, []);

    if(!deviceStatus)
    {
        return (
            <div>
                Loading device status...
            </div>
        );
    }

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
            <h2>Device Status</h2>

            <p>
                Registered Devices:
                <strong>
                    {" "}
                    {deviceStatus.registered_devices}
                </strong>
            </p>

            <p>
                Backend Status:
                <strong>
                    {" "}
                    {deviceStatus.backend_status}
                </strong>
            </p>
        </div>
    );
}

export default DeviceStatusCard;