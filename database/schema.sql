DROP DATABASE IF EXISTS pokemonApp;

CREATE DATABASE IF NOT EXISTS pokemonApp;

USE pokemonApp;

CREATE TABLE user (
    username VARCHAR(64) UNIQUE,
    id INTEGER AUTO_INCREMENT,
    PRIMARY KEY (id)
);

CREATE TABLE pokemon_instance (
    id INTEGER AUTO_INCREMENT,
    pokemon_id INTEGER,
    user_id INTEGER,
    name VARCHAR(64),
    level INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id)
        REFERENCES user(id)
        ON DELETE CASCADE
);

/* CREATE TABLE team (
    id INTEGER AUTO_INCREMENT,
    user_id INTEGER,
    pokemon1_id INTEGER DEFAULT null,
    pokemon2_id INTEGER DEFAULT null,
    pokemon3_id INTEGER DEFAULT null,
    pokemon4_id INTEGER DEFAULT null,
    pokemon5_id INTEGER DEFAULT null,
    pokemon6_id INTEGER DEFAULT null,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id)
        REFERENCES user(id)
        ON DELETE CASCADE,
    FOREIGN KEY (pokemon1_id)
        REFERENCES pokemon_instance(id)
        ON DELETE SET NULL,
    FOREIGN KEY (pokemon2_id)
        REFERENCES pokemon_instance(id)
        ON DELETE SET NULL,
    FOREIGN KEY (pokemon3_id)
        REFERENCES pokemon_instance(id)
        ON DELETE SET NULL,
    FOREIGN KEY (pokemon4_id)
        REFERENCES pokemon_instance(id)
        ON DELETE SET NULL,
    FOREIGN KEY (pokemon5_id)
        REFERENCES pokemon_instance(id)
        ON DELETE SET NULL,
    FOREIGN KEY (pokemon6_id)
        REFERENCES pokemon_instance(id)
        ON DELETE SET NULL
); */

CREATE TABLE session (
    id INTEGER AUTO_INCREMENT,
    hash VARCHAR(64),
    user_id INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id)
        REFERENCES user(id)
        ON DELETE CASCADE
);