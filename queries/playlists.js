const db = require("../db/dbConfig");
const playlist = require("../controllers/playlistController");
const songs = require("../controllers/songsController");

// this is for the names of playlists on the sidebar
const getPlaylistNames = async () => {
  try {
    const getList = await db.any("SELECT playlist_name FROM playlist");
    return getList;
  } catch (error) {
    return error;
  }
};

//this is for showing the actual playlist content
//i would like some second eyes on this query call
//this one just gets the playlist contents which is the song, I doesn't show the playlist title
const showPlaylist = async (id) => {
  try {
    const showList = await db.any(
      "SELECT s.* FROM songs s JOIN playlist_songs ON s.id = playlist_songs.song_id JOIN playlist p ON p.id = playlist_songs.playlist_id WHERE p.id = $1",
      id
      //this one shows all the playlists that one song is in with the users comments
      //   "SELECT p.* FROM playlist p JOIN playlist_songs ON p.id = playlist_songs.playlist_id JOIN songs s ON s.id = playlist_songs.song_id WHERE s.id = $1"
    );
    return showList;
  } catch (error) {
    return error;
  }
};

//showing only one playlist title so that we can connect this one and the showPlayList with eachother on I assume the front end(?)
const onePlaylistName = async (id) => {
  try {
    const getName = await db.one(
      "SELECT playlist_name FROM playlist WHERE id=$1",
      id
    );
    return getName;
  } catch (error) {
    return error;
  }
};

//query the user notes for a playlist
const playlistUserNotes = async (id) => {
  try {
    const userNotes = await db.one(
      "SELECT user_notes FROM playlist WHERE id=$1",
      id
    );
    return userNotes;
  } catch (error) {
    return error;
  }
};

//add a new playlist
const addNewPlaylist = async (playlist) => {
  const { playlist_name, user_notes } = playlist;
  try {
    const newList = await db.one(
      "INSERT INTO playlist(playlist_name, user_notes) VALUES ($1, $2) RETURNING *",
      [playlist_name, user_notes]
    );
    return newList;
  } catch (error) {
    return error;
  }
};

//add songs to an existing playlist
const updatePlaylist = async (id, playlist_songs) => {
  const { playlist_id, song_id } = playlist_songs;
  try {
    const updateList = await db.one(
      "INSERT INTO playlist_songs(playlist_id, song_id) VALUES (playlist_id=$1, song_id=$2) RETURNING *",
      [id, playlist_id, song_id]
    );
    return updateList;
  } catch (error) {
    return error;
  }
};

//delete song from playlist
const removeSong = async (id) => {
  try {
    const removeOneSong = await db.one(
      "DELETE FROM playlist_songs WHERE playlist_id=$1 AND song_id=$2 RETURNING *",
      id
    );
    return removeOneSong;
  } catch (error) {
    return error;
  }
};

//delete a playlist
const deletePlaylist = async (id) => {
  try {
    const deleteList = await db.one(
      "DELETE FROM playlist WHERE id=$1 RETURNING *",
      id
    );
    return deleteList;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getPlaylistNames,
  showPlaylist,
  onePlaylistName,
  playlistUserNotes,
  addNewPlaylist,
  deletePlaylist,
  removeSong,
};

//figure put how to also show playlist ti
