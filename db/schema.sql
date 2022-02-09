DROP DATABASE IF EXISTS tunes_dev;

CREATE DATABASE tunes_dev;

\c tunes_dev;


CREATE TABLE songs (
    id SERIAL PRIMARY KEY, 
    name TEXT NOT NULL, 
    artist TEXT NOT NULL,
    album TEXT NOT NULL, 
    time TEXT NOT NULL,
    is_favorite BOOLEAN
);

CREATE TABLE playlist (
    id SERIAL PRIMARY KEY,
    playlist_name TEXT NOT NULL,
    user_notes TEXT
);

CREATE TABLE playlist_songs (
    id SERIAL PRIMARY KEY,
    playlist_id INTEGER REFERENCES playlist (id)
    ON DELETE CASCADE,
    song_id INTEGER REFERENCES songs (id)
);