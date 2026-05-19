/*==============================================================
 *
 *  Intelligent Embedded Diagnostic System (IEDS)
 *  Signal Conditioning Interface
 *
 *  File: signal_conditioning.h
 *
 *  Description:
 *  Embedded signal conditioning layer for filtering,
 *  normalization, RMS computation, offset correction,
 *  and analog front-end preprocessing.
 *
 *==============================================================*/

#ifndef SIGNAL_CONDITIONING_H
#define SIGNAL_CONDITIONING_H

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

#define SIGNAL_MAX_SAMPLES      256

/*==============================================================
 *                  FILTER TYPES
 *==============================================================*/

/*
 * Supported digital filter types.
 */
typedef enum
{
    FILTER_TYPE_NONE = 0,
    FILTER_TYPE_LOWPASS,
    FILTER_TYPE_HIGHPASS,
    FILTER_TYPE_BANDPASS

} filter_type_t;

/*==============================================================
 *                  SIGNAL STATUS
 *==============================================================*/

/*
 * Signal conditioning runtime states.
 */
typedef enum
{
    SIGNAL_STATUS_OK = 0,
    SIGNAL_STATUS_ERROR,
    SIGNAL_STATUS_INVALID_PARAMETER

} signal_status_t;

/*==============================================================
 *                  SIGNAL FRAME
 *==============================================================*/

/*
 * Generic signal frame structure.
 */
typedef struct
{
    float samples[SIGNAL_MAX_SAMPLES];

    uint16_t sample_count;

    float sampling_frequency;

} conditioned_signal_t;

/*==============================================================
 *                  FILTER CONFIGURATION
 *==============================================================*/

/*
 * Digital filter configuration.
 */
typedef struct
{
    filter_type_t type;

    float cutoff_frequency;

    float gain;

} filter_config_t;

/*==============================================================
 *                  SIGNAL METRICS
 *==============================================================*/

/*
 * Computed signal quality metrics.
 */
typedef struct
{
    float rms;

    float peak;

    float mean;

    float noise_level;

    bool stable;

} signal_metrics_t;

/*==============================================================
 *                  SIGNAL CONDITIONING API
 *==============================================================*/

/*
 * Initializes signal conditioning subsystem.
 */
signal_status_t signal_conditioning_init(void);

/*
 * Applies low-pass filter.
 */
signal_status_t signal_apply_lowpass(
    conditioned_signal_t *signal,
    float cutoff_frequency);

/*
 * Applies high-pass filter.
 */
signal_status_t signal_apply_highpass(
    conditioned_signal_t *signal,
    float cutoff_frequency);

/*
 * Removes DC offset from signal.
 */
signal_status_t signal_remove_offset(
    conditioned_signal_t *signal);

/*
 * Normalizes signal amplitude.
 */
signal_status_t signal_normalize(
    conditioned_signal_t *signal);

/*
 * Applies configurable gain scaling.
 */
signal_status_t signal_scale_gain(
    conditioned_signal_t *signal,
    float gain);

/*
 * Computes RMS value.
 */
float signal_compute_rms(
    conditioned_signal_t *signal);

/*
 * Computes signal metrics.
 */
signal_metrics_t signal_compute_metrics(
    conditioned_signal_t *signal);

/*
 * Verifies signal stability.
 */
bool signal_is_stable(
    conditioned_signal_t *signal);

#ifdef __cplusplus
}
#endif

#endif /* SIGNAL_CONDITIONING_H */

