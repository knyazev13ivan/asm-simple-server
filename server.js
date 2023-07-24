const port = process.env.PORT || 3001;
const errorProbability = process.env.ERROR_PROBABILITY || 0;
const http = require("http");
const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const { log } = require("console");

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
    }, 100);
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
server.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("listening on *:" + port);
  console.log("error probability: " + errorProbability);
});
