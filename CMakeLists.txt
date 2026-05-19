#==============================================================
#
#  Intelligent Embedded Diagnostic System (IEDS)
#  CMake Build Configuration
#
#  File: CMakeLists.txt
#
#==============================================================

cmake_minimum_required(VERSION 3.16)

#==============================================================
#                      PROJECT CONFIGURATION
#==============================================================

project(
    IntelligentEmbeddedDiagnosticSystem
    VERSION 0.1.0
    DESCRIPTION "AI-assisted embedded diagnostic platform"
    LANGUAGES C
)

#==============================================================
#                      C STANDARD
#==============================================================

set(CMAKE_C_STANDARD 11)
set(CMAKE_C_STANDARD_REQUIRED ON)

#==============================================================
#                      BUILD OPTIONS
#==============================================================

option(
    ENABLE_DEBUG_LOGS
    "Enable runtime debug logging"
    ON
)

option(
    ENABLE_UNIT_TESTS
    "Enable unit testing framework"
    OFF
)

#==============================================================
#                      INCLUDE DIRECTORIES
#==============================================================

include_directories(

    firmware/

    firmware/core/
    firmware/core/ai/
    firmware/core/security/
    firmware/core/diagnostics/
    firmware/core/telemetry/
    firmware/core/scheduler/

    firmware/drivers/adc/
    firmware/drivers/display/

    firmware/communication/wifi/
    firmware/communication/mqtt/

    firmware/platform/
)

#==============================================================
#                      SOURCE FILES
#==============================================================

set(SOURCES

    firmware/main.c

    firmware/core/system_manager.c

    firmware/core/ai/inference_engine.c

    firmware/core/security/security_engine.c

    firmware/core/diagnostics/diagnostic_engine.c

    firmware/core/telemetry/telemetry_engine.c
    firmware/core/telemetry/ota_update.c

    firmware/core/scheduler/scheduler.c

    firmware/drivers/adc/adc_driver.c
    firmware/drivers/adc/signal_conditioning.c

    firmware/drivers/display/display_driver.c

    firmware/communication/wifi/wifi_driver.c
    firmware/communication/mqtt/mqtt_client.c

    firmware/platform/platform.c
)

#==============================================================
#                      EXECUTABLE TARGET
#==============================================================

add_executable(
    ieds_firmware
    ${SOURCES}
)

#==============================================================
#                      COMPILER DEFINITIONS
#==============================================================

target_compile_definitions(
    ieds_firmware
    PRIVATE

    $<$<BOOL:${ENABLE_DEBUG_LOGS}>:
    ENABLE_DEBUG_LOGS>
)

#==============================================================
#                      COMPILER FLAGS
#==============================================================

target_compile_options(
    ieds_firmware
    PRIVATE

    -Wall
    -Wextra
    -Wpedantic
)

#==============================================================
#                      LINKED LIBRARIES
#==============================================================

target_link_libraries(
    ieds_firmware
    m
)

#==============================================================
#                      BUILD SUMMARY
#==============================================================

message(STATUS
    "Building Intelligent Embedded Diagnostic System")

message(STATUS
    "C Standard: ${CMAKE_C_STANDARD}")

message(STATUS
    "Debug Logs: ${ENABLE_DEBUG_LOGS}")
