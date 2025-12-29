require("dotenv").config();

const { Pool } = require("pg");

const connectionString =
    process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL
    : process.env.DEV_DB_URL;

const ssl = process.env.NODE_ENV === "production"
  ? { rejectUnauthorized: false }
  : false;

const pool = new Pool({ connectionString, ssl });

module.exports = pool;
