require("dotenv").config();
const { Pool } = require("pg");
const fs = require("fs");

const env = process.env.NODE_ENV || "development";

const connectionString =
  env === "production"
    ? process.env.DATABASE_URL      
    : process.env.DEV_DB_URL; 

const pool = new Pool({
  connectionString,
  ssl: env === "production" ? { rejectUnauthorized: false } : false,
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = pool;