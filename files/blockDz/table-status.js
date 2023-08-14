module.exports = {
  generateStatus() {
    bushes = ["АГЗУ-1", "АГЗУ-2", "АГЗУ-3", "ЗУ-3", "ЗУ-4", "ЗУ-5", , "ЗУ-6"];

    return {
      id: "test",
      sensorNumber: Math.round(Math.random() * 30),
      bush: bushes[Math.round(Math.random() * 7)],
      site: "test",
      date: new Date(),
      status: Math.round(Math.random() * 4),
    };
  },
};
