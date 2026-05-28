/* =========================================================
 *
 * Intelligent Embedded Diagnostic System (IEDS)
 * Frontend API Service
 *
 * Author: HendyWab
 *
 * Description:
 * Handles backend REST API communication.
 *
 * Features:
 * - Latest telemetry retrieval
 * - Device status monitoring
 * - Historical telemetry retrieval
 *
 * ======================================================= */


// =========================================================
// IMPORTS
// =========================================================

import axios from "axios";


// =========================================================
// API CONFIGURATION
// =========================================================

const API_BASE_URL =
    "http://localhost:8000";


// =========================================================
// TELEMETRY API
// =========================================================

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


/*
 * Fetch telemetry history.
 */

export async function fetchTelemetryHistory()
{

    try
    {

        const response =
            await axios.get(
                `${API_BASE_URL}/telemetry/history`
            );

        return response.data;
    }

    catch(error)
    {

        console.error(
            "Telemetry history fetch failed:",
            error
        );

        return [];
    }
}


// =========================================================
// DEVICE API
// =========================================================

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