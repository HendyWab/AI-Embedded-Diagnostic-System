/*==============================================================
 *
 *  Intelligent Embedded Diagnostic System (IEDS)
 *  Display Driver Interface
 *
 *  File: display_driver.h
 *
 *  Description:
 *  TFT display abstraction layer for embedded diagnostics,
 *  real-time monitoring, waveform visualization,
 *  and local instrumentation interfaces.
 *
 *==============================================================*/

#ifndef DISPLAY_DRIVER_H
#define DISPLAY_DRIVER_H

#ifdef __cplusplus
extern "C" {
#endif

/*==============================================================
 *                      INCLUDE FILES
 *==============================================================*/

#include <stdint.h>
#include <stdbool.h>

/*==============================================================
 *                      DISPLAY CONFIGURATION
 *==============================================================*/

#define DISPLAY_WIDTH          480
#define DISPLAY_HEIGHT         320

#define DISPLAY_MAX_TEXT       128

/*==============================================================
 *                      DISPLAY COLORS
 *==============================================================*/

/*
 * RGB565 color definitions.
 */
typedef enum
{
    DISPLAY_COLOR_BLACK   = 0x0000,
    DISPLAY_COLOR_WHITE   = 0xFFFF,
    DISPLAY_COLOR_RED     = 0xF800,
    DISPLAY_COLOR_GREEN   = 0x07E0,
    DISPLAY_COLOR_BLUE    = 0x001F,
    DISPLAY_COLOR_YELLOW  = 0xFFE0,
    DISPLAY_COLOR_CYAN    = 0x07FF,
    DISPLAY_COLOR_ORANGE  = 0xFD20

} display_color_t;

/*==============================================================
 *                      DISPLAY STATUS
 *==============================================================*/

/*
 * Display runtime states.
 */
typedef enum
{
    DISPLAY_STATUS_OK = 0,
    DISPLAY_STATUS_ERROR,
    DISPLAY_STATUS_BUSY

} display_status_t;

/*==============================================================
 *                      DISPLAY ALERTS
 *==============================================================*/

/*
 * Embedded diagnostic alert levels.
 */
typedef enum
{
    DISPLAY_ALERT_INFO = 0,
    DISPLAY_ALERT_WARNING,
    DISPLAY_ALERT_CRITICAL

} display_alert_t;

/*==============================================================
 *                  DISPLAY SIGNAL FRAME
 *==============================================================*/

/*
 * Waveform rendering structure.
 */
typedef struct
{
    float *samples;

    uint16_t sample_count;

    float min_value;

    float max_value;

} display_signal_frame_t;

/*==============================================================
 *                  DISPLAY DRIVER API
 *==============================================================*/

/*
 * Initializes TFT display subsystem.
 */
display_status_t display_init(void);

/*
 * Clears display framebuffer.
 */
display_status_t display_clear(
    display_color_t color);

/*
 * Draws text string on display.
 */
display_status_t display_draw_text(
    uint16_t x,
    uint16_t y,
    const char *text,
    display_color_t color);

/*
 * Draws rectangular UI element.
 */
display_status_t display_draw_rectangle(
    uint16_t x,
    uint16_t y,
    uint16_t width,
    uint16_t height,
    display_color_t color);

/*
 * Draws waveform visualization.
 */
display_status_t display_draw_signal(
    display_signal_frame_t *signal,
    uint16_t x,
    uint16_t y,
    uint16_t width,
    uint16_t height);

/*
 * Displays diagnostic alert.
 */
display_status_t display_show_alert(
    const char *message,
    display_alert_t level);

/*
 * Renders embedded diagnostics dashboard.
 */
display_status_t display_render_dashboard(void);

/*
 * Updates display framebuffer.
 */
display_status_t display_update(void);

/*
 * Returns display initialization state.
 */
bool display_is_ready(void);

#ifdef __cplusplus
}
#endif

#endif /* DISPLAY_DRIVER_H */
