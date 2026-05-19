/*==============================================================
 *
 *  Intelligent Embedded Diagnostic System (IEDS)
 *  Security Engine Interface
 *
 *  File: security_engine.h
 *
 *  Description:
 *  Embedded security abstraction layer for authentication,
 *  integrity verification, secure telemetry,
 *  and device protection mechanisms.
 *
 *==============================================================*/

#ifndef SECURITY_ENGINE_H
#define SECURITY_ENGINE_H

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

#define SECURITY_MAX_TOKEN_LENGTH      64
#define SECURITY_MAX_PAYLOAD_SIZE     512
#define SECURITY_CHECKSUM_SIZE          4

/*==============================================================
 *                  SECURITY STATUS
 *==============================================================*/

/*
 * Security engine runtime states.
 */
typedef enum
{
    SECURITY_STATUS_OK = 0,
    SECURITY_STATUS_ERROR,
    SECURITY_STATUS_INVALID_TOKEN,
    SECURITY_STATUS_AUTH_FAILED,
    SECURITY_STATUS_INTEGRITY_FAILED

} security_status_t;

/*==============================================================
 *                  SECURITY CHECKSUM
 *==============================================================*/

/*
 * Integrity verification structure.
 */
typedef struct
{
    uint32_t checksum;

    uint32_t payload_size;

} security_checksum_t;

/*==============================================================
 *                  SECURITY TOKEN
 *==============================================================*/

/*
 * Authentication token structure.
 */
typedef struct
{
    char token[SECURITY_MAX_TOKEN_LENGTH];

    uint32_t expiration_timestamp;

    bool valid;

} security_token_t;

/*==============================================================
 *                  DEVICE CREDENTIALS
 *==============================================================*/

/*
 * Embedded device authentication credentials.
 */
typedef struct
{
    char device_id[32];

    char device_secret[64];

    bool authenticated;

} device_credentials_t;

/*==============================================================
 *                  SECURITY ENGINE API
 *==============================================================*/

/*
 * Initializes security subsystem.
 */
security_status_t security_init(void);

/*
 * Generates payload checksum.
 */
security_checksum_t security_generate_checksum(
    const uint8_t *payload,
    uint32_t length);

/*
 * Verifies payload integrity.
 */
bool security_verify_payload(
    const uint8_t *payload,
    uint32_t length,
    security_checksum_t checksum);

/*
 * Authenticates embedded device.
 */
security_status_t security_authenticate_device(
    device_credentials_t *credentials);

/*
 * Encrypts telemetry payload.
 */
security_status_t security_encrypt_payload(
    uint8_t *payload,
    uint32_t length);

/*
 * Decrypts telemetry payload.
 */
security_status_t security_decrypt_payload(
    uint8_t *payload,
    uint32_t length);

/*
 * Validates authentication token.
 */
bool security_validate_token(
    security_token_t *token);

/*
 * Verifies secure communication session.
 */
bool security_session_is_secure(void);

#ifdef __cplusplus
}
#endif

#endif /* SECURITY_ENGINE_H */