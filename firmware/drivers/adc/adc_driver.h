/*==============================================================
 *
 *  Intelligent Embedded Diagnostic System (IEDS)
 *  ADC Driver Interface
 *
 *  File: adc_driver.h
 *
 *  Description:
 *  Analog signal acquisition driver for voltage/current
 *  measurements, waveform capture, and embedded diagnostics.
 *
 *==============================================================*/

#ifndef ADC_DRIVER_H
#define ADC_DRIVER_H

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

#define ADC_MAX_CHANNELS          8
#define ADC_SIGNAL_BUFFER_SIZE    256

/*==============================================================
 *                      ADC CHANNELS
 *==============================================================*/

/*
 * Supported ADC acquisition channels.
 */
typedef enum
{
    ADC_CHANNEL_VOLTAGE = 0,
    ADC_CHANNEL_CURRENT,
    ADC_CHANNEL_TEMPERATURE,
    ADC_CHANNEL_SIGNAL_INPUT,
    ADC_CHANNEL_REFERENCE

} adc_channel_t;

/*==============================================================
 *                  ADC ACQUISITION MODES
 *==============================================================*/

/*
 * ADC sampling modes.
 */
typedef enum
{
    ADC_MODE_SINGLE = 0,
    ADC_MODE_CONTINUOUS,
    ADC_MODE_DMA

} adc_mode_t;

/*==============================================================
 *                  SIGNAL FRAME STRUCTURE
 *==============================================================*/

/*
 * Captured signal frame structure.
 */
typedef struct
{
    float samples[ADC_SIGNAL_BUFFER_SIZE];

    uint16_t sample_count;

    float sampling_frequency;

    uint32_t timestamp;

} adc_signal_frame_t;

/*==============================================================
 *                  ADC STATUS ENUMERATION
 *==============================================================*/

/*
 * ADC driver operation states.
 */
typedef enum
{
    ADC_STATUS_OK = 0,
    ADC_STATUS_ERROR,
    ADC_STATUS_TIMEOUT,
    ADC_STATUS_BUSY

} adc_status_t;

/*==============================================================
 *                  ADC CONFIGURATION
 *==============================================================*/

/*
 * ADC peripheral configuration.
 */
typedef struct
{
    uint8_t resolution_bits;

    float reference_voltage;

    adc_mode_t mode;

    uint32_t sampling_rate;

} adc_config_t;

/*==============================================================
 *                  ADC DRIVER API
 *==============================================================*/

/*
 * Initializes ADC peripheral and acquisition pipeline.
 */
adc_status_t adc_init(adc_config_t *config);

/*
 * Reads a raw ADC value from a channel.
 */
uint16_t adc_read_raw(adc_channel_t channel);

/*
 * Reads and converts voltage value.
 */
float adc_read_voltage(adc_channel_t channel);

/*
 * Reads and converts current value.
 */
float adc_read_current(adc_channel_t channel);

/*
 * Captures a complete signal frame.
 */
adc_signal_frame_t adc_capture_signal_frame(
    adc_channel_t channel);

/*
 * Starts DMA-based acquisition.
 */
adc_status_t adc_start_dma_capture(
    adc_channel_t channel);

/*
 * Stops active acquisition process.
 */
adc_status_t adc_stop_capture(void);

/*
 * Performs ADC calibration.
 */
adc_status_t adc_calibrate(void);

/*
 * Verifies ADC subsystem status.
 */
bool adc_is_ready(void);

#ifdef __cplusplus
}
#endif

#endif /* ADC_DRIVER_H */

