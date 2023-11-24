const {stations} = require("./station-name");
const dayjs = require("dayjs");
module.exports = {
    generateSemEvents() {
        return stations.map((station) => ({
            stationName: station,
            date: dayjs().subtract(Math.floor(Math.random() * 2), 'hour').format('YYYY-MM-DD HH:mm'),
            hydrogenSulfide: Math.random().toFixed(4),
            sulfurOxide: Math.random().toFixed(4),
            nitricDioxide: Math.random().toFixed(4),
            nitricMonoxide: Math.random().toFixed(4),
            nitricOxide: Math.random().toFixed(4),
            methane: Math.random().toFixed(4),
            tetrahydrocannabinol: Math.random().toFixed(4),
            CHx: Math.random().toFixed(4),
            carbonMonoxide: Math.random().toFixed(4),
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