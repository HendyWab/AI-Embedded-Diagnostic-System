/*==============================================================
 *
 *  Intelligent Embedded Diagnostic System (IEDS)
 *  MQTT Client Interface
 *
 *  File: mqtt_client.h
 *
 *  Description:
 *  Lightweight MQTT communication layer for telemetry,
 *  diagnostic synchronization, remote monitoring,
 *  and distributed embedded diagnostics.
 *
 *==============================================================*/

#ifndef MQTT_CLIENT_H
#define MQTT_CLIENT_H

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

#define MQTT_MAX_TOPIC_LENGTH      64
#define MQTT_MAX_PAYLOAD_SIZE     512
#define MQTT_MAX_CLIENT_ID         32

/*==============================================================
 *                      MQTT QoS LEVELS
 *==============================================================*/

/*
 * MQTT Quality of Service levels.
 */
typedef enum
{
    MQTT_QOS_0 = 0,
    MQTT_QOS_1,
    MQTT_QOS_2

} mqtt_qos_t;

/*==============================================================
 *                      MQTT STATUS
 *==============================================================*/

/*
 * MQTT operation states.
 */
typedef enum
{
    MQTT_STATUS_OK = 0,
    MQTT_STATUS_ERROR,
    MQTT_STATUS_TIMEOUT,
    MQTT_STATUS_DISCONNECTED

} mqtt_status_t;

/*==============================================================
 *                      MQTT MESSAGE
 *==============================================================*/

/*
 * Generic MQTT message structure.
 */
typedef struct
{
    char topic[MQTT_MAX_TOPIC_LENGTH];

    char payload[MQTT_MAX_PAYLOAD_SIZE];

    mqtt_qos_t qos;

    bool retained;

} mqtt_message_t;

/*==============================================================
 *                      MQTT CONFIGURATION
 *==============================================================*/

/*
 * MQTT broker configuration.
 */
typedef struct
{
    char broker_address[64];

    uint16_t broker_port;

    char client_id[MQTT_MAX_CLIENT_ID];

    char username[32];

    char password[32];

    bool tls_enabled;

} mqtt_config_t;

/*==============================================================
 *                  MQTT CALLBACKS
 *==============================================================*/

/*
 * MQTT message receive callback.
 */
typedef void (*mqtt_message_callback_t)(
    mqtt_message_t *message);

/*==============================================================
 *                  MQTT CLIENT API
 *==============================================================*/

/*
 * Initializes MQTT subsystem.
 */
mqtt_status_t mqtt_init(
    mqtt_config_t *config);

/*
 * Connects to MQTT broker.
 */
mqtt_status_t mqtt_connect(void);

/*
 * Disconnects from MQTT broker.
 */
mqtt_status_t mqtt_disconnect(void);

/*
 * Publishes telemetry message.
 */
mqtt_status_t mqtt_publish(
    mqtt_message_t *message);

/*
 * Subscribes to MQTT topic.
 */
mqtt_status_t mqtt_subscribe(
    const char *topic,
    mqtt_qos_t qos);

/*
 * Registers incoming message callback.
 */
void mqtt_register_callback(
    mqtt_message_callback_t callback);

/*
 * Processes MQTT runtime events.
 */
void mqtt_process(void);

/*
 * Returns broker connection status.
 */
bool mqtt_is_connected(void);

#ifdef __cplusplus
}
#endif

#endif /* MQTT_CLIENT_H */
