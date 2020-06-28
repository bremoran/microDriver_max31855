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


//% color=#7F0000 weight=25 icon="\u1f321" block="MAX31855 Driver"
namespace max31855Driver {
    /**
     * Update the reading from a MAX31855
     * @param CS The SSEL pin to select the MAX31855 to read
     */
    //% blockId="MAX31855Driver_update"
    //% block="MAX31855Update %CS"
    export function max31855Update(CS: DigitalPin) {
        pins.digitalWritePin(CS, 0);
        max31855UpdateInternal();
        pins.digitalWritePin(CS, 1);
    }
    //% shim=max31855Driver::max31855Update
    function max31855UpdateInternal() {
        // Dummy implementation for the simulator.
        console.log("Simulate: Read MAX31855 sensor");
    }

    /**
     * Return the status of the last update
     */
    //% shim=max31855Driver::max31855Status
    //% blockId="MAX31855Driver_status"
    //% block="MAX31855Status"
    export function max31855Status():number {
        // Dummy implementation for the simulator.
        console.log("Simulate: Status from MAX31855 sensor:");
        return 0;
    }
    //% shim=max31855Driver::max31855ThermocoupleTemperatureRaw
    function max31855ThermocoupleTemperatureRaw(): number {
        // Dummy implementation for the simulator.
        console.log("Simulate: thermocouple temperature from MAX31855 sensor: 201 (50.25C)");
        return 201;
    }
    /**
     * The thermocouple temperature from the last update
     */
    //% blockId="MAX31855Driver_thermocoupleTemperature"
    //% block="thermocoupleTemperature"
    export function thermocoupleTemperature(): number {
        return 0.25 * max31855ThermocoupleTemperatureRaw();
    }
    //% shim=max31855Driver::max31855ReaderTemperatureRaw
    function max31855ReaderTemperatureRaw(): number {
        // Dummy implementation for the simulator.
        console.log("Simulate: reader temperature from MAX31855 sensor: 488 (30.5C)");
        return 30.5/0.0625;
    }
    /**
     * The reader temperature from the last update
     */
    //% blockId="MAX31855Driver_ReaderTemperature"
    //% block="max31855Temperature"
    export function max31855Temperature(): number {
        return 0.0625 * max31855ReaderTemperatureRaw();
    }


}
