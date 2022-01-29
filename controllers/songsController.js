const express = require('express');
const songs = express.Router();
const {getAllSongs} = require('../queries/songs');

songs.get('/', async (req, res) => {
    const allSongs = await getAllSongs();
    console.log(allSongs)
    res.status(200).json(allSongs)
});

module.exports = songs; 