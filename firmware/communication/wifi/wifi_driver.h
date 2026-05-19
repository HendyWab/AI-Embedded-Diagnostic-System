/*==============================================================
 *
 *  Intelligent Embedded Diagnostic System (IEDS)
 *  WiFi Driver Interface
 *
 *  File: wifi_driver.h
 *
 *  Description:
 *  Embedded WiFi communication layer for telemetry,
 *  remote diagnostics, and distributed connectivity.
 *
 *==============================================================*/

#ifndef WIFI_DRIVER_H
#define WIFI_DRIVER_H

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

#define WIFI_MAX_SSID_LENGTH        32
#define WIFI_MAX_PASSWORD_LENGTH    64
#define WIFI_MAX_IP_LENGTH          16
#define WIFI_MAX_NETWORKS           10

/*==============================================================
 *                      WIFI STATUS
 *==============================================================*/

/*
 * WiFi runtime states.
 */
typedef enum
{
    WIFI_STATUS_OK = 0,
    WIFI_STATUS_ERROR,
    WIFI_STATUS_DISCONNECTED,
    WIFI_STATUS_TIMEOUT

} wifi_status_t;

/*==============================================================
 *                      WIFI SECURITY
 *==============================================================*/

/*
 * Supported WiFi security types.
 */
typedef enum
{
    WIFI_SECURITY_OPEN = 0,
    WIFI_SECURITY_WPA2,
    WIFI_SECURITY_WPA3

} wifi_security_t;

/*==============================================================
 *                      WIFI NETWORK
 *==============================================================*/

/*
 * Detected WiFi network descriptor.
 */
typedef struct
{
    char ssid[WIFI_MAX_SSID_LENGTH];

    int32_t rssi;

    wifi_security_t security;

} wifi_network_t;

/*==============================================================
 *                      WIFI CONFIGURATION
 *==============================================================*/

/*
 * WiFi connection parameters.
 */
typedef struct
{
    char ssid[WIFI_MAX_SSID_LENGTH];

    char password[WIFI_MAX_PASSWORD_LENGTH];

    bool auto_reconnect;

} wifi_config_t;

/*==============================================================
 *                  WIFI DRIVER API
 *==============================================================*/

/*
 * Initializes WiFi subsystem.
 */
wifi_status_t wifi_init(
    wifi_config_t *config);

/*
 * Connects to wireless network.
 */
wifi_status_t wifi_connect(void);

/*
 * Disconnects from wireless network.
 */
wifi_status_t wifi_disconnect(void);

/*
 * Scans nearby WiFi networks.
 */
uint8_t wifi_scan_networks(
    wifi_network_t *networks,
    uint8_t max_networks);

/*
 * Returns current signal strength.
 */
int32_t wifi_get_rssi(void);

/*
 * Returns assigned IP address.
 */
const char* wifi_get_ip(void);

/*
 * Returns WiFi connection state.
 */
bool wifi_is_connected(void);

/*
 * Processes WiFi runtime events.
 */
void wifi_process(void);

#ifdef __cplusplus
}
#endif

#endif /* WIFI_DRIVER_H */
