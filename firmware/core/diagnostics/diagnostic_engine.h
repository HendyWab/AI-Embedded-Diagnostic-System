/*==============================================================
 *
 *  Intelligent Embedded Diagnostic System (IEDS)
 *  Diagnostic Engine Interface
 *
 *  File: diagnostic_engine.h
 *
 *  Description:
 *  Core diagnostic interfaces for embedded signal analysis,
 *  anomaly detection, EMI monitoring, and Top-K fault ranking.
 *
 *==============================================================*/

#ifndef DIAGNOSTIC_ENGINE_H
#define DIAGNOSTIC_ENGINE_H

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

#define MAX_TOPK_FAULTS        5
#define MAX_SIGNAL_SAMPLES     256

/*==============================================================
 *                      SIGNAL STRUCTURES
 *==============================================================*/

/*
 * Structure representing an acquired signal frame.
 */
typedef struct
{
    float samples[MAX_SIGNAL_SAMPLES];
    uint16_t sample_count;

    float sampling_frequency;
    float signal_frequency;

    float rms_voltage;
    float rms_current;

    float temperature;

} signal_t;

/*==============================================================
 *                      FAULT ENUMERATION
 *==============================================================*/

/*
 * Supported diagnostic fault categories.
 */
typedef enum
{
    FAULT_NONE = 0,

    FAULT_EMI_INTERFERENCE,
    FAULT_SIGNAL_DISTORTION,
    FAULT_ADC_INSTABILITY,
    FAULT_POWER_INSTABILITY,
    FAULT_COMMUNICATION_ERROR,
    FAULT_OVERVOLTAGE,
    FAULT_OVERCURRENT,
    FAULT_THERMAL_ANOMALY,

    FAULT_UNKNOWN

} fault_type_t;

/*==============================================================
 *                  DIAGNOSTIC CONFIDENCE
 *==============================================================*/

/*
 * Structure containing fault probability data.
 */
typedef struct
{
    fault_type_t fault;
    float confidence;

} fault_confidence_t;

/*==============================================================
 *                  TOP-K DIAGNOSTIC RESULTS
 *==============================================================*/

/*
 * Top-K ranked diagnostic candidates.
 */
typedef struct
{
    fault_confidence_t ranked_faults[MAX_TOPK_FAULTS];
    uint8_t count;

} topk_result_t;

/*==============================================================
 *                  DIAGNOSTIC REPORT
 *==============================================================*/

/*
 * Global diagnostic report structure.
 */
typedef struct
{
    float anomaly_score;

    bool signal_integrity_ok;
    bool emi_detected;

    topk_result_t topk_faults;

} diagnostic_report_t;

/*==============================================================
 *                  DIAGNOSTIC API
 *==============================================================*/

/*
 * Computes a normalized anomaly score for the signal.
 */
float compute_anomaly_score(signal_t *signal);

/*
 * Detects potential EMI interference patterns.
 */
bool detect_emi_pattern(signal_t *signal);

/*
 * Evaluates signal integrity and stability.
 */
bool evaluate_signal_integrity(signal_t *signal);

/*
 * Performs Top-K diagnostic ranking.
 */
topk_result_t topk_fault_ranking(signal_t *signal);

/*
 * Generates a complete diagnostic report.
 */
diagnostic_report_t generate_report(signal_t *signal);

/*
 * Initializes the diagnostic engine.
 */
void diagnostic_engine_init(void);

#ifdef __cplusplus
}
#endif

#endif /* DIAGNOSTIC_ENGINE_H */

