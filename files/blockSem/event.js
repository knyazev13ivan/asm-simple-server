const {stations} = require("./station-name");
const dayjs = require("dayjs");
function generateValue() {
    return {
        value: Math.random().toFixed(4),
        date: dayjs().subtract(Math.floor(Math.random() * 2), 'hour').format('YYYY-MM-DD HH:mm')
    }
}


module.exports = {
    generateSemEvents() {
        return stations.map((station) => ({
            stationName: station,
            hydrogenSulfide: generateValue(),
            sulfurOxide: generateValue(),
            nitricDioxide: generateValue(),
            nitricMonoxide: generateValue(),
            nitricOxide: generateValue(),
            methane: generateValue(),
            tetrahydrocannabinol: generateValue(),
            CHx: generateValue(),
            carbonMonoxide: generateValue(),
            temperature: 20,
            windDirection: Math.floor(Math.random() * 360),
            windSpeed: (Math.random() * 10).toFixed(2),
            humidity: 40,
            pressure: 1015,
            internalTemperature: 25,
            precipitation: 0.234,
            sampleTemperature: 18,
            inputUV: 0.876,
            outputUV: 0.543,
            security: "Open",
            fire: "Close",
            coordinates: [
                55.94337,
                51.74913
            ]
        }))
    }
}