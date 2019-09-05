-- -- create pokemons table
-- CREATE TABLE IF NOT EXISTS pokemons (
--   id SERIAL PRIMARY KEY,
--   name TEXT,
--   img TEXT);

DROP TABLE IF EXISTS characters;

CREATE TABLE IF NOT EXISTS characters (
	id SERIAL PRIMARY KEY,
	name TEXT,
	art TEXT,
	home_thumbnail TEXT,
	home_sprite TEXT,
	battle_thumbnail TEXT DEFAULT NULL,
	spritesheet TEXT DEFAULT NULL,
	reverse_spritesheet TEXT DEFAULT NULL,
	health INTEGER,
	attack INTEGER,
	description TEXT,
	subtitle TEXT
);