/*==============================================================
 *
 *  Intelligent Embedded Diagnostic System (IEDS)
 *  Telemetry Engine Interface
 *
 *  File: telemetry_engine.h
 *
 *  Description:
 *  Wireless telemetry interfaces for diagnostic synchronization,
 *  MQTT communication, remote monitoring, and cloud integration.
 *
 *==============================================================*/

#ifndef TELEMETRY_ENGINE_H
#define TELEMETRY_ENGINE_H

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

#define TELEMETRY_MAX_PAYLOAD_SIZE     512
#define TELEMETRY_MAX_TOPIC_LENGTH      64

/*==============================================================
 *                  TELEMETRY STATUS
 *==============================================================*/

/*
 * Telemetry transmission states.
 */
typedef enum
{
    TELEMETRY_OK = 0,
    TELEMETRY_ERROR,
    TELEMETRY_TIMEOUT,
    TELEMETRY_DISCONNECTED

} telemetry_status_t;

/*==============================================================
 *                  TELEMETRY TRANSPORT
 *==============================================================*/

/*
 * Supported communication interfaces.
 */
typedef enum
{
    TRANSPORT_WIFI = 0,
    TRANSPORT_BLUETOOTH,
    TRANSPORT_SERIAL,
    TRANSPORT_MQTT

} telemetry_transport_t;

/*==============================================================
 *                  TELEMETRY PAYLOAD
 *==============================================================*/

/*
 * Generic telemetry payload structure.
 */
typedef struct
{
    char topic[TELEMETRY_MAX_TOPIC_LENGTH];

    char payload[TELEMETRY_MAX_PAYLOAD_SIZE];

    uint32_t timestamp;

} telemetry_packet_t;

/*==============================================================
 *                  DEVICE INFORMATION
 *==============================================================*/

/*
 * Device synchronization information.
 */
typedef struct
{
    char device_id[32];

    char firmware_version[16];

    bool telemetry_enabled;

    telemetry_transport_t transport;

} device_info_t;

/*==============================================================
 *                  TELEMETRY API
 *==============================================================*/

/*
 * Initializes the telemetry engine.
 */
void telemetry_engine_init(void);

/*
 * Publishes a diagnostic report.
 */
telemetry_status_t telemetry_publish_report(
    diagnostic_report_t *report);

/*
 * Sends a critical diagnostic alert.
 */
telemetry_status_t telemetry_send_alert(
    const char *message);

/*
 * Pushes raw signal acquisition frames.
 */
telemetry_status_t telemetry_push_signal_frame(
    signal_t *signal);

/*
 * Synchronizes device metadata with backend services.
 */
telemetry_status_t telemetry_sync_device(
    device_info_t *device);

/*
 * Builds a telemetry payload packet.
 */
telemetry_packet_t telemetry_build_payload(
    diagnostic_report_t *report);

/*
 * Verifies telemetry connectivity status.
 */
bool telemetry_is_connected(void);

#ifdef __cplusplus
}
#endif

#endif /* TELEMETRY_ENGINE_H */

