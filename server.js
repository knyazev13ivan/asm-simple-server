const port = process.env.PORT || 3030;
const errorProbability = process.env.ERROR_PROBABILITY || 0;
const http = require("http");
const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const { Server } = require("socket.io");
const { generateStatus } = require("./files/blockDz/table-status");
const { generateEvent } = require("./files/blockDz/events");
const { generatePks } = require("./files/blockSem/pks");
const { generateSemEvents } = require("./files/blockSem/event");
const { stations } = require("./files/blockSem/station-name");

const app = express();

app.use(express.json({ limit: "50mb" }));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

function generateError() {
  const num = Math.random();
  return num < errorProbability;
}

app.get("/files/blockDz/table", (req, res) => {
  const isError = generateError(res);
  if (!isError) {
    const json = fs.readFileSync(
      path.join(__dirname, "/files/blockDz/table.json"),
      "utf8"
    );

    setTimeout(() => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(json);
    }, 200);
  }
});

function sendFile(res, fileName) {
  const filePath = `files/${fileName}`;
  try {
    setTimeout(() => {
      res.download(filePath);
    }, 3000);
  } catch (e) {
    response.writeHead(400, { "Content-Type": "text/plain" });
    response.end("ERROR File does not exist");
  }
  return;
}

app.get("/blockDz/xlsx", (req, res) => {
  const isError = generateError(res);
  if (!isError) {
    sendFile(res, "report.xlsx");
  }
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  function sendEvents() {
    const event = setInterval(() => socket.emit('events', generateEvent()), 2000);
    setTimeout(() => clearInterval(event), 12000)
    return event
  }

  function sendBlockSemPks() {
    let isFistEvent = true;
    const semPks = setInterval(() => {
      socket.emit('pksEvent', isFistEvent ? generatePks() : [generatePks()[Math.floor(Math.random() * 20)]])
      isFistEvent = false

    }, 2000);
    setTimeout(() => clearInterval(semPks), 12000)
    return semPks
  }

  function sendBlockSemEvent() {
    let isFistEvent = true;
    const semEvent = setInterval(() => {
      socket.emit('semEvent', isFistEvent ? generateSemEvents() : [generateSemEvents()[Math.floor(Math.random() * stations.length)]]);
      isFistEvent = false
    }, 2000);
    setTimeout(() => clearInterval(semEvent), 12000)
    return semEvent
  }

  sendBlockSemPks()
  sendBlockSemEvent()
  sendEvents()

  socket.on("error", (e) => console.log(e));

  socket.on("pksDiscreteness", (e) => console.log(e, 'pksDiscreteness'));
  socket.on("semDiscreteness", (e) => console.log(e, 'semDiscreteness'));

  socket.emit("work", JSON.stringify("WebSocket server works"));
});

server.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("listening on *:" + port);
  console.log("error probability: " + errorProbability);
});
