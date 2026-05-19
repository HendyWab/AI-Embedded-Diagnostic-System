/*==============================================================
 *
 *  Intelligent Embedded Diagnostic System (IEDS)
 *  Signal Conditioning Implementation
 *
 *  File: signal_conditioning.c
 *
 *==============================================================*/

#include "signal_conditioning.h"

#include <math.h>
#include <stddef.h>
/*==============================================================
 *                  INTERNAL STATE
 *==============================================================*/

/*
 * Internal initialization state.
 */
static bool g_signal_conditioning_ready = false;

/*==============================================================
 *                  INTERNAL FUNCTIONS
 *==============================================================*/

/*
 * Internal helper to compute mean value.
 */
static float compute_mean(
    conditioned_signal_t *signal)
{
    float sum = 0.0f;

    for(uint16_t i = 0;
        i < signal->sample_count;
        i++)
    {
        sum += signal->samples[i];
    }

    return (sum / signal->sample_count);
}

/*==============================================================
 *                  PUBLIC FUNCTIONS
 *==============================================================*/

signal_status_t signal_conditioning_init(void)
{
    /*
     * Future implementation:
     * - DSP subsystem initialization
     * - Filter coefficient generation
     * - Hardware accelerator setup
     */

    g_signal_conditioning_ready = true;

    return SIGNAL_STATUS_OK;
}

signal_status_t signal_apply_lowpass(
    conditioned_signal_t *signal,
    float cutoff_frequency)
{
    (void)cutoff_frequency;

    if(signal == NULL)
    {
        return SIGNAL_STATUS_ERROR;
    }

    /*
     * Future implementation:
     * - FIR filtering
     * - IIR filtering
     * - Adaptive filtering
     */

    return SIGNAL_STATUS_OK;
}

signal_status_t signal_apply_highpass(
    conditioned_signal_t *signal,
    float cutoff_frequency)
{
    (void)cutoff_frequency;

    if(signal == NULL)
    {
        return SIGNAL_STATUS_ERROR;
    }

    /*
     * Future implementation:
     * - Digital high-pass filtering
     * - Harmonic rejection
     */

    return SIGNAL_STATUS_OK;
}

signal_status_t signal_remove_offset(
    conditioned_signal_t *signal)
{
    if(signal == NULL)
    {
        return SIGNAL_STATUS_ERROR;
    }

    float mean =
        compute_mean(signal);

    for(uint16_t i = 0;
        i < signal->sample_count;
        i++)
    {
        signal->samples[i] -= mean;
    }

    return SIGNAL_STATUS_OK;
}

signal_status_t signal_normalize(
    conditioned_signal_t *signal)
{
    if(signal == NULL)
    {
        return SIGNAL_STATUS_ERROR;
    }

    float peak = 0.0f;

    for(uint16_t i = 0;
        i < signal->sample_count;
        i++)
    {
        float abs_value =
            fabsf(signal->samples[i]);

        if(abs_value > peak)
        {
            peak = abs_value;
        }
    }

    if(peak == 0.0f)
    {
        return SIGNAL_STATUS_ERROR;
    }

    for(uint16_t i = 0;
        i < signal->sample_count;
        i++)
    {
        signal->samples[i] /= peak;
    }

    return SIGNAL_STATUS_OK;
}

signal_status_t signal_scale_gain(
    conditioned_signal_t *signal,
    float gain)
{
    if(signal == NULL)
    {
        return SIGNAL_STATUS_ERROR;
    }

    for(uint16_t i = 0;
        i < signal->sample_count;
        i++)
    {
        signal->samples[i] *= gain;
    }

    return SIGNAL_STATUS_OK;
}

float signal_compute_rms(
    conditioned_signal_t *signal)
{
    if(signal == NULL)
    {
        return 0.0f;
    }

    float sum = 0.0f;

    for(uint16_t i = 0;
        i < signal->sample_count;
        i++)
    {
        sum +=
            signal->samples[i] *
            signal->samples[i];
    }

    return sqrtf(
        sum / signal->sample_count);
}

signal_metrics_t signal_compute_metrics(
    conditioned_signal_t *signal)
{
    signal_metrics_t metrics;

    metrics.rms =
        signal_compute_rms(signal);

    metrics.mean =
        compute_mean(signal);

    metrics.peak = 0.0f;

    for(uint16_t i = 0;
        i < signal->sample_count;
        i++)
    {
        float abs_value =
            fabsf(signal->samples[i]);

        if(abs_value > metrics.peak)
        {
            metrics.peak = abs_value;
        }
    }

    metrics.noise_level =
        metrics.peak - metrics.rms;

    metrics.stable =
        signal_is_stable(signal);

    return metrics;
}

bool signal_is_stable(
    conditioned_signal_t *signal)
{
    signal_metrics_t metrics;

    metrics =
        signal_compute_metrics(signal);

    /*
     * Example stability heuristic.
     */
    return (metrics.noise_level < 0.20f);
}
