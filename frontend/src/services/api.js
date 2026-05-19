import axios from "axios";

/*==============================================================
 *
 *  Intelligent Embedded Diagnostic System (IEDS)
 *  Frontend API Service
 *
 *==============================================================*/

/*
 * Backend API base URL.
 */
const API_BASE_URL =
    "http://localhost:8000";

/*==============================================================
 *                  TELEMETRY API
 *==============================================================*/

/*
 * Fetch latest telemetry payload.
 */
export async function fetchLatestTelemetry()
{
    try
    {
        const response =
            await axios.get(
                `${API_BASE_URL}/telemetry/latest`
            );

        return response.data;
    }
    catch(error)
    {
        console.error(
            "Telemetry fetch failed:",
            error
        );

        return null;
    }
}

/*==============================================================
 *                  DEVICE API
 *==============================================================*/

/*
 * Fetch device status.
 */
export async function fetchDeviceStatus()
{
    try
    {
        const response =
            await axios.get(
                `${API_BASE_URL}/device/status`
            );

        return response.data;
    }
    catch(error)
    {
        console.error(
            "Device status fetch failed:",
            error
        );

        return null;
    }
}
