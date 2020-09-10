"use strict";
const db = require("../db-connection");

module.exports.up = async function (next) {
  await db.query(
    "CREATE TABLE todos (todo_id Serial Primary Key, username varchar(255) NOT NULL, title varchar(255) NOT NULL, done BOOLEAN NOT NULL, CONSTRAINT fk_user FOREIGN KEY(username) REFERENCES users(username))"
  );

  next();
};

module.exports.down = async function (next) {
  await db.query("DROP TABLE todos");

  next();
};
