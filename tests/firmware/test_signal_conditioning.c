/*==============================================================
 *
 *  Intelligent Embedded Diagnostic System (IEDS)
 *  Signal Conditioning Tests
 *
 *  File: test_signal_conditioning.c
 *
 *==============================================================*/

#include "../../firmware/drivers/adc/signal_conditioning.h"

#include <assert.h>
#include <stdio.h>

/*==============================================================
 *                  TEST RMS COMPUTATION
 *==============================================================*/

static void test_signal_rms(void)
{
    conditioned_signal_t signal;

    signal.sample_count = 4;

    signal.samples[0] = 1.0f;
    signal.samples[1] = 1.0f;
    signal.samples[2] = 1.0f;
    signal.samples[3] = 1.0f;

    float rms =
        signal_compute_rms(&signal);

    assert(rms > 0.99f &&
           rms < 1.01f);

    printf(
        "[PASS] RMS computation test\n");
}

/*==============================================================
 *                  TEST OFFSET REMOVAL
 *==============================================================*/

static void test_offset_removal(void)
{
    conditioned_signal_t signal;

    signal.sample_count = 4;

    signal.samples[0] = 5.0f;
    signal.samples[1] = 5.0f;
    signal.samples[2] = 5.0f;
    signal.samples[3] = 5.0f;

    signal_remove_offset(&signal);

    assert(signal.samples[0] == 0.0f);

    printf(
        "[PASS] Offset removal test\n");
}

/*==============================================================
 *                  TEST ENTRY POINT
 *==============================================================*/

int main(void)
{
    test_signal_rms();

    test_offset_removal();

    printf(
        "\nAll signal conditioning tests passed.\n");

    return 0;
}
