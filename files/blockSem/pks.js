module.exports = {
    generatePks() {
        return Array.from({ length: 20 }, (_, i) => ({
            pksNumber: i + 1,
            H2S: Math.random().toFixed(2),
            temperature: Math.round(Math.random() * 20),
            windDirection: Math.floor(Math.random() * 360),
            windSpeed: (Math.random() * 10).toFixed(2),
            pressure: 1015,
            humidity: 60,
            internalTemperature: 25,
            voltageInput: Math.round(Math.random() * 15),
            security: "Close",
            fire: "Close",
        }))
    }
}