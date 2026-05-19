/*==============================================================
 *
 *  Intelligent Embedded Diagnostic System (IEDS)
 *  System Manager Interface
 *
 *  File: system_manager.h
 *
 *  Description:
 *  Central embedded runtime orchestration layer for subsystem
 *  initialization, diagnostics coordination,
 *  telemetry synchronization, and platform supervision.
 *
 *==============================================================*/

#ifndef SYSTEM_MANAGER_H
#define SYSTEM_MANAGER_H

#ifdef __cplusplus
extern "C" {
#endif

/*==============================================================
 *                      INCLUDE FILES
 *==============================================================*/

#include <stdint.h>
#include <stdbool.h>

/*==============================================================
 *                      SYSTEM STATES
 *==============================================================*/

/*
 * Global runtime states.
 */
typedef enum
{
    SYSTEM_STATE_IDLE = 0,
    SYSTEM_STATE_INITIALIZING,
    SYSTEM_STATE_RUNNING,
    SYSTEM_STATE_DIAGNOSTIC,
    SYSTEM_STATE_ERROR,
    SYSTEM_STATE_SHUTDOWN

} system_state_t;

/*==============================================================
 *                      SYSTEM STATUS
 *==============================================================*/

/*
 * System manager operation states.
 */
typedef enum
{
    SYSTEM_STATUS_OK = 0,
    SYSTEM_STATUS_ERROR,
    SYSTEM_STATUS_INIT_FAILED,
    SYSTEM_STATUS_RUNTIME_FAULT

} system_status_t;

/*==============================================================
 *                  SYSTEM HEALTH REPORT
 *==============================================================*/

/*
 * Runtime subsystem health information.
 */
typedef struct
{
    bool platform_ok;

    bool adc_ok;

    bool telemetry_ok;

    bool wifi_ok;

    bool mqtt_ok;

    bool ai_ok;

    bool security_ok;

    bool ota_ok;

    bool display_ok;

} system_health_report_t;

/*==============================================================
 *                  SYSTEM MANAGER API
 *==============================================================*/

/*
 * Initializes complete embedded platform.
 */
system_status_t system_manager_init(void);

/*
 * Starts runtime orchestration.
 */
system_status_t system_manager_start(void);

/*
 * Executes main runtime processing cycle.
 */
void system_manager_process(void);

/*
 * Executes diagnostics supervision cycle.
 */
void system_manager_run_diagnostics(void);

/*
 * Performs subsystem health verification.
 */
system_health_report_t system_manager_health_check(void);

/*
 * Stops all runtime services.
 */
system_status_t system_manager_shutdown(void);

/*
 * Returns current runtime state.
 */
system_state_t system_manager_get_state(void);

/*
 * Returns runtime operational status.
 */
bool system_manager_is_running(void);

#ifdef __cplusplus
}
#endif

#endif /* SYSTEM_MANAGER_H */