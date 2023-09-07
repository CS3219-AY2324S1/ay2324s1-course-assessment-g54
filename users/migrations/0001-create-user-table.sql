CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE users (
  id              UUID    PRIMARY KEY   DEFAULT gen_random_uuid(),
  name            TEXT    NOT NULL,
  email           TEXT    NOT NULL      UNIQUE,
  passwordHash    TEXT    NOT NULL
);

