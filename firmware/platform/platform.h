/*==============================================================
 *
 *  Intelligent Embedded Diagnostic System (IEDS)
 *  Platform Abstraction Layer Interface
 *
 *  File: platform.h
 *
 *  Description:
 *  Cross-platform hardware abstraction layer for embedded
 *  initialization, timing, watchdog management,
 *  and MCU portability support.
 *
 *==============================================================*/

#ifndef PLATFORM_H
#define PLATFORM_H

#ifdef __cplusplus
extern "C" {
#endif

/*==============================================================
 *                      INCLUDE FILES
 *==============================================================*/

#include <stdint.h>
#include <stdbool.h>

/*==============================================================
 *                      PLATFORM TYPES
 *==============================================================*/

/*
 * Supported embedded platforms.
 */
typedef enum
{
    PLATFORM_GENERIC = 0,
    PLATFORM_ESP32,
    PLATFORM_STM32,
    PLATFORM_PIC

} platform_type_t;

/*==============================================================
 *                      PLATFORM STATUS
 *==============================================================*/

/*
 * Platform runtime states.
 */
typedef enum
{
    PLATFORM_STATUS_OK = 0,
    PLATFORM_STATUS_ERROR,
    PLATFORM_STATUS_NOT_INITIALIZED

} platform_status_t;

/*==============================================================
 *                  PLATFORM INFORMATION
 *==============================================================*/

/*
 * Runtime platform information.
 */
typedef struct
{
    platform_type_t type;

    char platform_name[32];

    uint32_t cpu_frequency_hz;

    uint32_t system_tick_hz;

    bool watchdog_enabled;

} platform_info_t;

/*==============================================================
 *                  PLATFORM API
 *==============================================================*/

/*
 * Initializes embedded platform.
 */
platform_status_t platform_init(void);

/*
 * Returns active platform type.
 */
platform_type_t platform_get_type(void);

/*
 * Returns platform information structure.
 */
platform_info_t platform_get_info(void);

/*
 * Delays execution in milliseconds.
 */
void platform_delay_ms(uint32_t delay_ms);

/*
 * Returns system tick counter.
 */
uint32_t platform_get_tick(void);

/*
 * Performs software system reset.
 */
void platform_reset(void);

/*
 * Refreshes watchdog timer.
 */
void platform_watchdog_kick(void);

/*
 * Enables watchdog supervision.
 */
platform_status_t platform_watchdog_enable(void);

/*
 * Disables watchdog supervision.
 */
platform_status_t platform_watchdog_disable(void);

/*
 * Returns platform initialization state.
 */
bool platform_is_ready(void);

#ifdef __cplusplus
}
#endif

#endif /* PLATFORM_H */

