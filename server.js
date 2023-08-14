const port = process.env.PORT || 3030;
const errorProbability = process.env.ERROR_PROBABILITY || 0;
const http = require("http");
const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const { Server } = require("socket.io");
const WebSocket = require("ws");
const { generateStatus } = require("./files/blockDz/table-status");

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

// const webSocketServer = new WebSocket.Server({ server });

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  setTimeout(() => {
    const intervalId = setInterval(
      () => socket.emit("status", JSON.stringify(generateStatus())),
      1000
    );
    // setTimeout(() => clearInterval(intervalId), 600000);
  }, 2000);

  socket.on("error", (e) => console.log(e));

  socket.emit("work", JSON.stringify("WebSocket server works"));
});

// const dispatchEvent = (message) => {
//   const json = JSON.parse(message);
//   webSocketServer.clients.forEach((client) =>
//     client.send(JSON.stringify(json))
//   );
// };

// webSocketServer.on("connection", (ws) => {
//   ws.on("message", (m) => dispatchEvent(m));

//   webSocketServer.clients.forEach((client) => {
//     const intervalId = setInterval(
//       // () => client.send(JSON.stringify("pong!")),
//       () => client.send(JSON.stringify(generateStatus())),
//       1500
//     );
//     setTimeout(() => clearInterval(intervalId), 30000);
//   });

//   ws.on("error", (e) => ws.send(e));

//   ws.send(JSON.stringify("WebSocket server works"));
// });

server.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("listening on *:" + port);
  console.log("error probability: " + errorProbability);
});
