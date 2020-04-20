// tests go here; this will not be compiled when this package is used as an extension.
basic.forever(() => {
    max31855Driver.max31855Update(DigitalPin.P16);
    if (max31855Driver.max31855Status() == 0) {
        serial.writeValue("MAX31855 Temperature", max31855Driver.max31855Temperature());
        serial.writeValue("Thermocouple Temperature", max31855Driver.thermocoupleTemperature());
    } else {
        serial.writeValue("MAX31855 Error Code", max31855Driver.max31855Status());
    }
    basic.pause(1000);
})