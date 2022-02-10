const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const songsController = require("./controllers/songsController");
const playlistController = require("./controllers/playlistController");

app.use("/songs", songsController);
app.use("/playlist", playlistController);

app.get("/", (request, response) => {
  response.send("Welcome to Tuner App");
});

app.get("*", (request, response) => {
  response.status(404).send("Page Not Found!");
});

module.exports = app;
