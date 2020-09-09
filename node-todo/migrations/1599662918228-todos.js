"use strict";
const db = require("../db-connection");

module.exports.up = async function (next) {
  await db.query(
    "CREATE TABLE todos (id Serial Primary Key, title varchar(255) NOT NULL, done BOOLEAN NOT NULL)"
  );
  next();
};

module.exports.down = async function (next) {
  await db.query("DROP TABLE todos");

  next();
};
