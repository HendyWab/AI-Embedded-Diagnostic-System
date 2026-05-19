/*==============================================================
 *
 *  Intelligent Embedded Diagnostic System (IEDS)
 *  Scheduler Interface
 *
 *  File: scheduler.h
 *
 *  Description:
 *  RTOS-oriented task scheduler for embedded diagnostics,
 *  telemetry orchestration, AI inference execution,
 *  and real-time monitoring.
 *
 *==============================================================*/

#ifndef SCHEDULER_H
#define SCHEDULER_H

#ifdef __cplusplus
extern "C" {
#endif

/*==============================================================
 *                      INCLUDE FILES
 *==============================================================*/

#include <stdint.h>
#include <stdbool.h>

/*==============================================================
 *                      CONFIGURATION
 *==============================================================*/

#define MAX_SCHEDULER_TASKS      16
#define TASK_NAME_MAX_LENGTH     32

/*==============================================================
 *                      TASK PRIORITIES
 *==============================================================*/

/*
 * Scheduler task priorities.
 */
typedef enum
{
    TASK_PRIORITY_LOW = 0,
    TASK_PRIORITY_NORMAL,
    TASK_PRIORITY_HIGH,
    TASK_PRIORITY_CRITICAL

} task_priority_t;

/*==============================================================
 *                      TASK STATES
 *==============================================================*/

/*
 * Runtime task states.
 */
typedef enum
{
    TASK_STATE_READY = 0,
    TASK_STATE_RUNNING,
    TASK_STATE_SUSPENDED,
    TASK_STATE_BLOCKED,
    TASK_STATE_STOPPED

} task_state_t;

/*==============================================================
 *                      TASK CALLBACK
 *==============================================================*/

/*
 * Generic task callback prototype.
 */
typedef void (*task_callback_t)(void);

/*==============================================================
 *                      TASK STRUCTURE
 *==============================================================*/

/*
 * Runtime task descriptor.
 */
typedef struct
{
    char name[TASK_NAME_MAX_LENGTH];

    task_priority_t priority;

    task_state_t state;

    uint32_t period_ms;

    uint32_t last_execution;

    task_callback_t callback;

} scheduler_task_t;

/*==============================================================
 *                  SCHEDULER STATUS
 *==============================================================*/

/*
 * Scheduler operation states.
 */
typedef enum
{
    SCHEDULER_OK = 0,
    SCHEDULER_ERROR,
    SCHEDULER_FULL,
    SCHEDULER_INVALID_TASK

} scheduler_status_t;

/*==============================================================
 *                  SCHEDULER API
 *==============================================================*/

/*
 * Initializes scheduler subsystem.
 */
scheduler_status_t scheduler_init(void);

/*
 * Creates a periodic runtime task.
 */
scheduler_status_t scheduler_create_task(
    const char *name,
    task_priority_t priority,
    uint32_t period_ms,
    task_callback_t callback);

/*
 * Starts scheduler execution.
 */
scheduler_status_t scheduler_start(void);

/*
 * Stops scheduler execution.
 */
scheduler_status_t scheduler_stop(void);

/*
 * Suspends a task by index.
 */
scheduler_status_t scheduler_suspend_task(
    uint8_t task_id);

/*
 * Resumes a suspended task.
 */
scheduler_status_t scheduler_resume_task(
    uint8_t task_id);

/*
 * Executes one scheduler processing cycle.
 */
void scheduler_run_cycle(void);

/*
 * Runs complete diagnostics cycle.
 */
void scheduler_run_diagnostics_cycle(void);

/*
 * Returns scheduler active state.
 */
bool scheduler_is_running(void);

#ifdef __cplusplus
}
#endif

#endif /* SCHEDULER_H */

