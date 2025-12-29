require("dotenv").config();
const { Pool } = require("pg");
const fs = require("fs");

const pool = new Pool({
  user: process.env.PROD_DB_USER,
  password: process.env.PROD_DB_PASSWORD,
  host: process.env.PROD_DB_HOST,
  port: process.env.PROD_DB_PORT,
  database: process.env.PROD_DB_NAME,
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("./ca.pem").toString(),
  },
});

module.exports = pool;
