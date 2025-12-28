require("dotenv").config()
const { Pool } = require("pg");
const fs = require("fs");


module.exports = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
     ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("./ca.pem").toString(),
  },
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})


