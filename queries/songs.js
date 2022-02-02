const db = require("../db/dbConfig");

const getAllSongs = async () => {
  try {
    const allSongs = await db.any("SELECT * FROM songs");
    return allSongs;
  } catch (error) {
    console.log(error);
  }
};

const getSong = async (id) => {
  try {
    const song = await db.one("SELECT * FROM songs WHERE id=$1", id);
    return song;
  } catch (error) {
    console.log(error);
  }
};

const createSong = async (newSong) => {
  const { name, artist, album, time, is_favorite } = newSong;
  try {
    const newTrack = await db.one(
      "INSERT INTO songs(name, artist, album, time, is_favor)",
      [name, artist, album, time, is_favorite]
    );
    return newTrack;
  } catch (error) {
    console.log(error);
  }
};

const deleteSong = async (id) => {
  try {
    const deletedSong = await db.one(
      "DELETE FROM songs WHERE id=$1 RETURNING",
      id
    );
    return deletedSong;
  } catch (error) {
    return error;
  }
};

const updateSong = async (id, song) => {
  const { name, artist, album, time, is_favorite } = song;
  try {
    const updatedSong = await db.one(
      "UPDATE songs SET name=$2, artist=$3, album=$4, time=$5, is_favorite=$6 WHERE id=$1 RETURNING *",
      [id, name, artist, album, time, is_favorite]
    );
    return updatedSong;
  } catch (error) {
    return error;
  }
};

module.exports = { getAllSongs, getSong, createSong, deleteSong, updateSong };
