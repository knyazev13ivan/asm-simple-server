const { sites } = require('./sites')

module.exports = {
    generateEvent() {
        const bushes = ["АГЗУ-1", "АГЗУ-2", "АГЗУ-3", "ЗУ-3", "ЗУ-4", "ЗУ-5", "ЗУ-6"];
        const possibleEvents = ['Сработал датчик CN₄', 'Сработал датчик H₂S', 'Сработал датчик CH4O'];
        const randomStatus = Math.floor(Math.random() * 6)

        return {
            id: Date.now().toString(36) + Math.random().toString(36).substring(2),
            sensorNumber: Math.floor(1 + Math.random() * (50)),
            bush: bushes[Math.round(Math.random() * 6)],
            site: sites[Math.round(Math.random() * 1080)],
            startDate: new Date(new Date() - Math.random()*(1e+12)),
            endDate: new Date(new Date() - Math.random()*(1e+12)),
            duration: Math.round(Math.random() * 9000),
            event: possibleEvents[Math.round(Math.random() * 2)],
            sensorValue: Math.floor(1 + Math.random() * (10)),
            eventStatus: Math.floor(Math.random() * 2) + 2,
            distance: Math.floor(Math.random() * 10),
            status: randomStatus === 2 ? 0 : randomStatus
        };
    },
};
