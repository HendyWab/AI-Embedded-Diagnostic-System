/*==============================================================
 *
 *  Intelligent Embedded Diagnostic System (IEDS)
 *  AI Inference Engine Interface
 *
 *  File: inference_engine.h
 *
 *  Description:
 *  Lightweight embedded AI inference engine for anomaly
 *  detection, signal classification, confidence estimation,
 *  and Top-K diagnostic prediction.
 *
 *==============================================================*/

#ifndef INFERENCE_ENGINE_H
#define INFERENCE_ENGINE_H

#ifdef __cplusplus
extern "C" {
#endif

/*==============================================================
 *                      INCLUDE FILES
 *==============================================================*/

#include <stdint.h>
#include <stdbool.h>

#include "../diagnostics/diagnostic_engine.h"

/*==============================================================
 *                      CONFIGURATION
 *==============================================================*/

#define AI_MAX_FEATURES            32
#define AI_MAX_TOPK_PREDICTIONS     5

/*==============================================================
 *                  FEATURE VECTOR
 *==============================================================*/

/*
 * Extracted AI feature vector.
 */
typedef struct
{
    float values[AI_MAX_FEATURES];

    uint16_t length;

} feature_vector_t;

/*==============================================================
 *                  INFERENCE CLASSES
 *==============================================================*/

/*
 * AI classification outputs.
 */
typedef enum
{
    AI_CLASS_NORMAL = 0,
    AI_CLASS_EMI,
    AI_CLASS_SIGNAL_DISTORTION,
    AI_CLASS_ADC_FAILURE,
    AI_CLASS_POWER_ANOMALY,
    AI_CLASS_COMMUNICATION_ERROR,
    AI_CLASS_UNKNOWN

} ai_class_t;

/*==============================================================
 *                  AI PREDICTION
 *==============================================================*/

/*
 * AI prediction structure.
 */
typedef struct
{
    ai_class_t classification;

    float confidence;

} ai_prediction_t;

/*==============================================================
 *                  TOP-K PREDICTIONS
 *==============================================================*/

/*
 * Ranked AI inference results.
 */
typedef struct
{
    ai_prediction_t predictions[AI_MAX_TOPK_PREDICTIONS];

    uint8_t count;

} ai_topk_result_t;

/*==============================================================
 *                  AI ENGINE STATUS
 *==============================================================*/

/*
 * AI engine runtime states.
 */
typedef enum
{
    AI_ENGINE_OK = 0,
    AI_ENGINE_ERROR,
    AI_ENGINE_NOT_READY

} ai_engine_status_t;

/*==============================================================
 *                  AI ENGINE API
 *==============================================================*/

/*
 * Initializes AI inference engine.
 */
ai_engine_status_t ai_engine_init(void);

/*
 * Extracts features from acquired signal.
 */
feature_vector_t ai_extract_features(
    signal_t *signal);

/*
 * Executes embedded AI inference.
 */
ai_prediction_t ai_run_inference(
    feature_vector_t *features);

/*
 * Computes anomaly confidence score.
 */
float ai_compute_confidence(
    feature_vector_t *features);

/*
 * Generates Top-K AI predictions.
 */
ai_topk_result_t ai_generate_topk_predictions(
    feature_vector_t *features);

/*
 * Detects signal anomalies using AI logic.
 */
bool ai_detect_anomaly(
    feature_vector_t *features);

/*
 * Verifies AI engine availability.
 */
bool ai_engine_is_ready(void);

#ifdef __cplusplus
}
#endif

#endif /* INFERENCE_ENGINE_H */
