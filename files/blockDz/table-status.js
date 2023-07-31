module.exports = {
  generateStatus() {
    return {
      id: "test",
      sensorNumber: Math.round(Math.random() * 30),
      bush: "test",
      site: "test",
      date: new Date(),
      status: Math.round(Math.random() * 4),
    };
  },
};
