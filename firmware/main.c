/*==============================================================
 *
 *  Intelligent Embedded Diagnostic System (IEDS)
 *  Main Application Entry Point
 *
 *  File: main.c
 *
 *  Description:
 *  Central runtime entry point for embedded diagnostics,
 *  telemetry synchronization, AI inference orchestration,
 *  and intelligent system supervision.
 *
 *==============================================================*/

#include "core/system_manager.h"

#include "platform/platform.h"

#include <stdint.h>

/*==============================================================
 *                  APPLICATION CONFIGURATION
 *==============================================================*/

/*
 * Diagnostics execution interval.
 */
#define DIAGNOSTIC_INTERVAL_MS    1000

/*==============================================================
 *                  INTERNAL STATE
 *==============================================================*/

/*
 * Runtime diagnostics timestamp.
 */
static uint32_t g_last_diagnostic_tick = 0;

/*==============================================================
 *                  INTERNAL FUNCTIONS
 *==============================================================*/

/*
 * Executes periodic diagnostics workflow.
 */
static void run_periodic_diagnostics(void)
{
    uint32_t current_tick;

    current_tick =
        platform_get_tick();

    if((current_tick -
        g_last_diagnostic_tick)
        >= DIAGNOSTIC_INTERVAL_MS)
    {
        /*
         * Execute diagnostics cycle.
         */
        system_manager_run_diagnostics();

        g_last_diagnostic_tick =
            current_tick;
    }
}

/*
 * Main runtime supervision loop.
 */
static void runtime_loop(void)
{
    while(system_manager_is_running())
    {
        /*
         * Runtime subsystem processing.
         */
        system_manager_process();

        /*
         * Periodic diagnostics execution.
         */
        run_periodic_diagnostics();

        /*
         * Runtime pacing delay.
         */
        platform_delay_ms(10);
    }
}

/*==============================================================
 *                  APPLICATION ENTRY POINT
 *==============================================================*/

int main(void)
{
    system_status_t status;

    /*
     * Initialize complete embedded platform.
     */
    status =
        system_manager_init();

    if(status != SYSTEM_STATUS_OK)
    {
        /*
         * Critical initialization failure.
         * Enter fail-safe state.
         */
        while(1)
        {
            platform_delay_ms(1000);
        }
    }

    /*
     * Start runtime orchestration.
     */
    status =
        system_manager_start();

    if(status != SYSTEM_STATUS_OK)
    {
        /*
         * Runtime startup failure.
         */
        while(1)
        {
            platform_delay_ms(1000);
        }
    }

    /*
     * Execute runtime supervision loop.
     */
    runtime_loop();

    /*
     * Graceful shutdown sequence.
     */
    system_manager_shutdown();

    /*
     * Embedded systems should never
     * normally exit main().
     */
    while(1)
    {
        platform_delay_ms(1000);
    }

    return 0;
}
