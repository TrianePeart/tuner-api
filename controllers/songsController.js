const express = require("express");
const songs = express.Router();
const {
  getAllSongs,
  getSong,
  createSong,
  deleteSong,
  updateSong,
} = require("../queries/songs");

songs.get("/", async (_, res) => {
  const allSongs = await getAllSongs();
  // console.log("GET request to /songs", allSongs);
  res.status(200).json(allSongs);
});

songs.get("/:id", async (req, res) => {
  const song = await getSong(req.params.id);
  if (song.id) {
    res.status(200).json(song);
  } else {
    res.status(404).json({ Error: "Not Found!" });
  }
});

// songs.post("/", async (req, res) => {
//   const newTrack = req.body;
//   const { body } = req;
//   const { name, artist, album, time } = body;
//   if (name || artist || album || time) {
//     res.status(200).json(newTrack);
//   } else {
//     res.status(400).json({ error: `Complete all fields` });
//   }
// });

songs.post("/", async (request, response) => {
  const song = await createSong(request.body);
  if (song.id) {
    response.status(200).json(song);
  } else {
    response.status(404).json(song);
  }
});

songs.delete("/:id", async (request, response) => {
  // console.log("DELETE request to /songs/:id");
  const deletedSong = await deleteSong(request.params.id);
  if (deletedSong.id) {
    response.status(200).json(deletedSong);
  } else {
    response.status(404).json({ Error: `Page not found!` });
  }
});

songs.put("/:id", async (request, response) => {
  // console.log("UPDATE request to /songs/:id");
  const updatedSong = await updateSong(request.params.id, request.body);
  if (updatedSong.id) {
    response.status(200).json(updatedSong);
  } else {
    response.status(404).json("Update did not work.");
  }
});

module.exports = songs;
