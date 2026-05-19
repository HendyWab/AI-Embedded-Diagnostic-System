/*==============================================================
 *
 *  Intelligent Embedded Diagnostic System (IEDS)
 *  OTA Update Interface
 *
 *  File: ota_update.h
 *
 *  Description:
 *  Secure OTA firmware update subsystem for embedded
 *  deployment, firmware lifecycle management,
 *  and remote update orchestration.
 *
 *==============================================================*/

#ifndef OTA_UPDATE_H
#define OTA_UPDATE_H

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

#define OTA_VERSION_MAX_LENGTH      32
#define OTA_URL_MAX_LENGTH         128

/*==============================================================
 *                      OTA STATUS
 *==============================================================*/

/*
 * OTA runtime states.
 */
typedef enum
{
    OTA_STATUS_OK = 0,
    OTA_STATUS_ERROR,
    OTA_STATUS_NO_UPDATE,
    OTA_STATUS_DOWNLOAD_FAILED,
    OTA_STATUS_VERIFY_FAILED,
    OTA_STATUS_APPLY_FAILED

} ota_status_t;

/*==============================================================
 *                      OTA STATES
 *==============================================================*/

/*
 * OTA update lifecycle states.
 */
typedef enum
{
    OTA_STATE_IDLE = 0,
    OTA_STATE_CHECKING,
    OTA_STATE_DOWNLOADING,
    OTA_STATE_VERIFYING,
    OTA_STATE_APPLYING,
    OTA_STATE_COMPLETED,
    OTA_STATE_ROLLBACK

} ota_state_t;

/*==============================================================
 *                  OTA FIRMWARE INFO
 *==============================================================*/

/*
 * Firmware metadata structure.
 */
typedef struct
{
    char version[OTA_VERSION_MAX_LENGTH];

    char download_url[OTA_URL_MAX_LENGTH];

    uint32_t firmware_size;

    uint32_t checksum;

} ota_firmware_info_t;

/*==============================================================
 *                  OTA UPDATE REPORT
 *==============================================================*/

/*
 * OTA update status report.
 */
typedef struct
{
    ota_state_t state;

    uint8_t progress_percent;

    bool update_available;

} ota_report_t;

/*==============================================================
 *                  OTA API
 *==============================================================*/

/*
 * Initializes OTA subsystem.
 */
ota_status_t ota_init(void);

/*
 * Checks firmware update availability.
 */
ota_status_t ota_check_update(
    ota_firmware_info_t *firmware);

/*
 * Downloads firmware package.
 */
ota_status_t ota_download_firmware(
    ota_firmware_info_t *firmware);

/*
 * Verifies downloaded firmware integrity.
 */
ota_status_t ota_verify_firmware(
    ota_firmware_info_t *firmware);

/*
 * Applies firmware update.
 */
ota_status_t ota_apply_update(
    ota_firmware_info_t *firmware);

/*
 * Restores previous firmware image.
 */
ota_status_t ota_rollback(void);

/*
 * Returns current firmware version.
 */
const char* ota_get_version(void);

/*
 * Returns OTA runtime report.
 */
ota_report_t ota_get_report(void);

/*
 * Processes OTA runtime tasks.
 */
void ota_process(void);

#ifdef __cplusplus
}
#endif

#endif /* OTA_UPDATE_H */
