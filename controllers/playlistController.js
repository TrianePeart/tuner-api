const express = require("express");
const playlist = express.Router();

const {
  getPlaylistNames,
  showPlaylist,
  onePlaylistName,
  playlistUserNotes,
  addNewPlaylist,
  deletePlaylist,
  removeSong,
} = require("../queries/playlists");

//
playlist.get("/", async (_, response) => {
  //   console.log("GET request to /playlist");
  const list = await getPlaylistNames();
  response.status(200).json(list);
});

//get just a single playlist and all it's content
//NOT WORKING

playlist.get("/:id", async (request, response) => {
  const { id } = request.params;
  // console.log(showPlaylist(request.body));
  const playlistName = await onePlaylistName(id);
  const playlistContent = await showPlaylist(id);
  const userNotes = await playlistUserNotes(id);
  if (playlistName) {
    response.status(200).json(playlistName);
  }
  if (playlistContent) {
    response.status(200).json(playlistContent);
  }
  if (userNotes) {
    response.status(200).json(userNotes);
  } else {
    response.status(404).json({ Error: `Page not found!` });
  }
});

//add a new playlist
playlist.post("/", async (request, response) => {
  console.log("POST request to /playlist");
  const newList = await addNewPlaylist();
  if (newList.id) {
    response.status(200).json(newList);
  } else {
    response.status(404).json({ Error: `Page not found!` });
  }
});

//delete playlist
playlist.delete("/:id", async (request, response) => {
  const removeList = await deletePlaylist();
  if (removeList.id) {
    response.status(200).json(removeList);
  } else {
    response.status(404).json({ Error: `Page not found!` });
  }
});

//delete one playlist song
playlist.delete("/:id/:songId", async (request, response) => {
  const deleteSong = await removeSong();
  if (deleteSong.id) {
    response.status(200).json(deleteSong);
  } else {
    response.status(404).json({ Error: `Page not found!` });
  }
});

//.put (update) the playlist with one song

module.exports = playlist;
