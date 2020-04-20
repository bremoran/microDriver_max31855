// ----------------------------------------------------------------------------
// Copyright 2020 Brendan Moran
//
// SPDX-License-Identifier: MIT
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to 
// deal in the Software without restriction, including without limitation the 
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or 
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// 
// ----------------------------------------------------------------------------

#include "microDriver_max31855.h"
#include "pxt.h"

namespace max31855Driver {
static uint32_t response = (1<<16) | 1;

/**
 * @brief Read from the MAX31855 into the response buffer
 *
 * This function does not control the chip select line. This is to enable
 * interoperability with Typescript functions, which do not use compatible pin
 * types.
 * 
 */
void max31855Update() {
    SPI _spi(MICROBIT_PIN_P15, MICROBIT_PIN_P14, MICROBIT_PIN_P13);
    _spi.frequency(1000000);
    _spi.format(8, 0);
    response = 0;
    for (size_t i = 4; i; i--) {
        response = response << 8 | _spi.write(0);
    }
}

/**
 * @brief Report the status of the last update from the MAX31855
 * 
 * This function examines the response from the MAX31855. If the fault indicator
 * is 0, then the status is success (0). Otherwise, a code specific to the fault
 * is returned.
 * 
 * @retval 0 Success
 * @retval 1 Open Circuit
 * @retval 2 Short Circuit to Ground
 * @retval 3 Short Circuit to VCC
 */
int max31855Status() {
    if (!(response & (1<<16))) {
        return 0;
    }
    if (response & 1) {
        return 1;
    }
    if (response & 2) {
        return 2;
    }
    if (response & 4) {
        return 3;
    }
    // Should not be possible
    return 0;
}

/**
 * @brief Report last raw thermocouple measurement from MAX31855
 * 
 * The raw thermocouple measurement is in degrees Celsius * 4.
 * Values range from -1000(-250 C) to 6400 (1200 C)
 * 
 * @return the thermocouple temperature in degrees C * 4
 */
int max31855ThermocoupleTemperatureRaw() {
    int tc = (*(int32_t *)&response) >> 18;
    return tc;
}

/**
 * @brief Report last raw internal temperature measurement from MAX31855
 *
 * The raw MAX31855 internal temperature is in degrees Celsius * 16. 
 * Values range from -880(-55 C) to 2032 (127 C)
 * 
 * @return the MAX31855 internal temperature in degrees C * 16
 */
int max31855ReaderTemperatureRaw() {
    uint16_t tjraw = response & 0xFFFF;
    int tj = (*(int16_t *)&tjraw) >> 4;
    return tj;
}
}