/*==============================================================
 *
 *  Intelligent Embedded Diagnostic System (IEDS)
 *  Scheduler Implementation
 *
 *  File: scheduler.c
 *
 *==============================================================*/

#include "scheduler.h"

#include <string.h>

/*==============================================================
 *                  INTERNAL STATE
 *==============================================================*/

/*
 * Scheduler runtime task list.
 */
static scheduler_task_t
g_scheduler_tasks[MAX_SCHEDULER_TASKS];

/*
 * Current task count.
 */
static uint8_t g_task_count = 0;

/*
 * Scheduler active state.
 */
static bool g_scheduler_running = false;

/*==============================================================
 *                  INTERNAL FUNCTIONS
 *==============================================================*/

/*
 * Internal scheduler tick source.
 */
static uint32_t scheduler_get_tick(void)
{
    /*
     * Future implementation:
     * - RTOS tick integration
     * - Hardware timer source
     */

    static uint32_t tick = 0;

    return tick++;
}

/*==============================================================
 *                  PUBLIC FUNCTIONS
 *==============================================================*/

scheduler_status_t scheduler_init(void)
{
    memset(g_scheduler_tasks,
           0,
           sizeof(g_scheduler_tasks));

    g_task_count = 0;

    g_scheduler_running = false;

    return SCHEDULER_OK;
}

scheduler_status_t scheduler_create_task(
    const char *name,
    task_priority_t priority,
    uint32_t period_ms,
    task_callback_t callback)
{
    if(g_task_count >= MAX_SCHEDULER_TASKS)
    {
        return SCHEDULER_FULL;
    }

    scheduler_task_t *task =
        &g_scheduler_tasks[g_task_count];

    strncpy(task->name,
            name,
            TASK_NAME_MAX_LENGTH - 1);

    task->priority = priority;

    task->state = TASK_STATE_READY;

    task->period_ms = period_ms;

    task->last_execution = 0;

    task->callback = callback;

    g_task_count++;

    return SCHEDULER_OK;
}

scheduler_status_t scheduler_start(void)
{
    g_scheduler_running = true;

    return SCHEDULER_OK;
}

scheduler_status_t scheduler_stop(void)
{
    g_scheduler_running = false;

    return SCHEDULER_OK;
}

scheduler_status_t scheduler_suspend_task(
    uint8_t task_id)
{
    if(task_id >= g_task_count)
    {
        return SCHEDULER_INVALID_TASK;
    }

    g_scheduler_tasks[task_id].state =
        TASK_STATE_SUSPENDED;

    return SCHEDULER_OK;
}

scheduler_status_t scheduler_resume_task(
    uint8_t task_id)
{
    if(task_id >= g_task_count)
    {
        return SCHEDULER_INVALID_TASK;
    }

    g_scheduler_tasks[task_id].state =
        TASK_STATE_READY;

    return SCHEDULER_OK;
}

void scheduler_run_cycle(void)
{
    if(!g_scheduler_running)
    {
        return;
    }

    uint32_t current_tick =
        scheduler_get_tick();

    for(uint8_t i = 0;
        i < g_task_count;
        i++)
    {
        scheduler_task_t *task =
            &g_scheduler_tasks[i];

        if(task->state != TASK_STATE_READY)
        {
            continue;
        }

        if((current_tick - task->last_execution)
            >= task->period_ms)
        {
            task->state = TASK_STATE_RUNNING;

            if(task->callback != NULL)
            {
                task->callback();
            }

            task->last_execution =
                current_tick;

            task->state = TASK_STATE_READY;
        }
    }
}

void scheduler_run_diagnostics_cycle(void)
{
    /*
     * Future implementation:
     * - Signal acquisition task
     * - AI inference task
     * - Telemetry synchronization
     * - TFT dashboard update
     * - Watchdog supervision
     */
}

bool scheduler_is_running(void)
{
    return g_scheduler_running;
}

