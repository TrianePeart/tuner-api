DROP DATABASE IF EXISTS tunes_dev;

CREATE DATABASE tunes_dev;

\c tunes_dev;


CREATE TABLE playlists (
    id SERIAL PRIMARY KEY,
    myPlaylist TEXT NOT NULL
);


CREATE TABLE songs(
    id SERIAL PRIMARY KEY, 
    name TEXT NOT NULL, 
    playlist TEXT NOT NULL,
    artist TEXT NOT NULL,
    album TEXT NOT NULL, 
    time TEXT NOT NULL,
    is_favorite BOOLEAN
);