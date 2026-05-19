/*==============================================================
 *
 *  Intelligent Embedded Diagnostic System (IEDS)
 *  System Manager Implementation
 *
 *  File: system_manager.c
 *
 *==============================================================*/

#include "system_manager.h"

#include "../security/security_engine.h"
#include "../ai/inference_engine.h"
#include "../telemetry/telemetry_engine.h"
#include "../telemetry/ota_update.h"
#include "../scheduler/scheduler.h"

#include "../../drivers/adc/adc_driver.h"
#include "../../drivers/adc/signal_conditioning.h"
#include "../../drivers/display/display_driver.h"

#include "../../communication/wifi/wifi_driver.h"
#include "../../communication/mqtt/mqtt_client.h"

#include "../../platform/platform.h"

/*==============================================================
 *                  INTERNAL STATE
 *==============================================================*/

/*
 * Internal runtime state.
 */
static system_state_t g_system_state =
    SYSTEM_STATE_IDLE;

/*
 * Runtime operational flag.
 */
static bool g_system_running = false;

/*==============================================================
 *                  INTERNAL FUNCTIONS
 *==============================================================*/

/*
 * Internal subsystem initialization helper.
 */
static bool initialize_subsystems(void)
{
    /*
     * Platform initialization.
     */
    if(platform_init() != PLATFORM_STATUS_OK)
    {
        return false;
    }

    /*
     * Security subsystem.
     */
    if(security_init() != SECURITY_STATUS_OK)
    {
        return false;
    }

    /*
     * Display subsystem.
     */
    if(display_init() != DISPLAY_STATUS_OK)
    {
        return false;
    }

    /*
     * Signal conditioning subsystem.
     */
    if(signal_conditioning_init()
        != SIGNAL_STATUS_OK)
    {
        return false;
    }

    /*
     * AI engine initialization.
     */
    if(ai_engine_init()
        != AI_ENGINE_OK)
    {
        return false;
    }

    /*
     * Scheduler initialization.
     */
    if(scheduler_init()
        != SCHEDULER_OK)
    {
        return false;
    }

    /*
     * OTA subsystem initialization.
     */
    if(ota_init()
        != OTA_STATUS_OK)
    {
        return false;
    }

    return true;
}

/*==============================================================
 *                  PUBLIC FUNCTIONS
 *==============================================================*/

system_status_t system_manager_init(void)
{
    g_system_state =
        SYSTEM_STATE_INITIALIZING;

    if(!initialize_subsystems())
    {
        g_system_state =
            SYSTEM_STATE_ERROR;

        return SYSTEM_STATUS_INIT_FAILED;
    }

    g_system_state =
        SYSTEM_STATE_IDLE;

    return SYSTEM_STATUS_OK;
}

system_status_t system_manager_start(void)
{
    /*
     * Start runtime orchestration.
     */
    g_system_running = true;

    g_system_state =
        SYSTEM_STATE_RUNNING;

    scheduler_start();

    return SYSTEM_STATUS_OK;
}

void system_manager_process(void)
{
    if(!g_system_running)
    {
        return;
    }

    /*
     * Main runtime orchestration.
     */

    scheduler_run_cycle();

    wifi_process();

    mqtt_process();

    ota_process();

    platform_watchdog_kick();

    /*
     * Future implementation:
     * - Runtime supervision
     * - Fault escalation
     * - Telemetry synchronization
     * - Power management
     */
}

void system_manager_run_diagnostics(void)
{
    g_system_state =
        SYSTEM_STATE_DIAGNOSTIC;

    scheduler_run_diagnostics_cycle();

    /*
     * Future implementation:
     * - ADC acquisition
     * - Signal analysis
     * - AI inference
     * - Top-K ranking
     * - Telemetry publishing
     */

    g_system_state =
        SYSTEM_STATE_RUNNING;
}

system_health_report_t
system_manager_health_check(void)
{
    system_health_report_t report;

    report.platform_ok =
        platform_is_ready();

    report.adc_ok =
        adc_is_ready();

    report.telemetry_ok =
        telemetry_is_connected();

    report.wifi_ok =
        wifi_is_connected();

    report.mqtt_ok =
        mqtt_is_connected();

    report.ai_ok =
        ai_engine_is_ready();

    report.security_ok =
        security_session_is_secure();

    report.ota_ok = true;

    report.display_ok =
        display_is_ready();

    return report;
}

system_status_t system_manager_shutdown(void)
{
    g_system_running = false;

    scheduler_stop();

    wifi_disconnect();

    mqtt_disconnect();

    g_system_state =
        SYSTEM_STATE_SHUTDOWN;

    return SYSTEM_STATUS_OK;
}

system_state_t system_manager_get_state(void)
{
    return g_system_state;
}

bool system_manager_is_running(void)
{
    return g_system_running;
}