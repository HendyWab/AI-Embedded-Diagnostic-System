/*==============================================================
 *
 *  Intelligent Embedded Diagnostic System (IEDS)
 *  TinyML Model Metadata
 *
 *  File: model_metadata.h
 *
 *==============================================================*/

#ifndef MODEL_METADATA_H
#define MODEL_METADATA_H

/*==============================================================
 *                  MODEL INFORMATION
 *==============================================================*/

#define MODEL_NAME                "IEDS_EMI_MODEL"

#define MODEL_AUTHOR              "ChendyTronics"

#define MODEL_VERSION_MAJOR       1

#define MODEL_VERSION_MINOR       0

#define MODEL_INPUT_VECTOR_SIZE   32

#define MODEL_OUTPUT_CLASSES       4

/*==============================================================
 *                  OUTPUT CLASSES
 *==============================================================*/

/*
 * Embedded diagnostic classes.
 */
typedef enum
{
    MODEL_CLASS_NORMAL = 0,
    MODEL_CLASS_EMI,
    MODEL_CLASS_SIGNAL_DISTORTION,
    MODEL_CLASS_POWER_FAULT

} model_output_class_t;

#endif /* MODEL_METADATA_H */