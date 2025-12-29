const { Pool } = require("pg");
const fs = require("fs");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const connectionString =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL
    : process.env.DEV_DB_URL;

const ssl =
  process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false;

const pool = new Pool({
  connectionString,
  ssl,
  max: 5, // limit simultaneous connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = pool;
