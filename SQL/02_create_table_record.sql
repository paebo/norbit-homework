\c norbit;

DROP TABLE IF EXISTS record CASCADE;

CREATE TABLE record
(
  id SERIAL PRIMARY KEY,
  lat double precision,
  lon double precision,
  heading double precision
);