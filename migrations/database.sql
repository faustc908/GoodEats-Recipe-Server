/* Set up database and table */

CREATE DATABASE recipe;

CREATE TABLE recipe
(
    recipe_id SERIAL PRIMARY KEY,
    description TEXT,
    owner VARCHAR(50)
);