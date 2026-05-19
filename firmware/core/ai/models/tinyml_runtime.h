/*==============================================================
 *
 *  Intelligent Embedded Diagnostic System (IEDS)
 *  TinyML Runtime Interface
 *
 *  File: tinyml_runtime.h
 *
 *  Description:
 *  Lightweight embedded TinyML runtime abstraction layer
 *  for edge inference execution and AI model management.
 *
 *==============================================================*/

#ifndef TINYML_RUNTIME_H
#define TINYML_RUNTIME_H

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

#define TINYML_MAX_INPUT_SIZE        128
#define TINYML_MAX_OUTPUT_SIZE        16
#define TINYML_MODEL_NAME_LENGTH      32

/*==============================================================
 *                      RUNTIME STATUS
 *==============================================================*/

/*
 * TinyML runtime states.
 */
typedef enum
{
    TINYML_STATUS_OK = 0,
    TINYML_STATUS_ERROR,
    TINYML_STATUS_MODEL_NOT_LOADED,
    TINYML_STATUS_INFERENCE_FAILED

} tinyml_status_t;

/*==============================================================
 *                      MODEL METADATA
 *==============================================================*/

/*
 * Embedded AI model information.
 */
typedef struct
{
    char model_name[TINYML_MODEL_NAME_LENGTH];

    uint32_t model_size;

    uint32_t input_size;

    uint32_t output_size;

    float model_version;

} tinyml_model_info_t;

/*==============================================================
 *                      INFERENCE RESULT
 *==============================================================*/

/*
 * TinyML inference output.
 */
typedef struct
{
    uint8_t predicted_class;

    float confidence;

    float outputs[TINYML_MAX_OUTPUT_SIZE];

} tinyml_result_t;

/*==============================================================
 *                      RUNTIME API
 *==============================================================*/

/*
 * Initializes TinyML runtime.
 */
tinyml_status_t tinyml_init(void);

/*
 * Loads embedded AI model.
 */
tinyml_status_t tinyml_load_model(
    const uint8_t *model_data,
    uint32_t model_size);

/*
 * Executes TinyML inference.
 */
tinyml_result_t tinyml_run_inference(
    float *input_data,
    uint32_t input_size);

/*
 * Returns model metadata.
 */
tinyml_model_info_t tinyml_get_model_info(void);

/*
 * Verifies runtime readiness.
 */
bool tinyml_is_ready(void);

#ifdef __cplusplus
}
#endif

#endif /* TINYML_RUNTIME_H */
