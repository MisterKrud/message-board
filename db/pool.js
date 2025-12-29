require("dotenv").config();
const { Pool } = require("pg");
const fs = require("fs");

const env = process.env.NODE_ENV || "development";

const config = env === "production" ? {
    host: process.env.PROD_DB_HOST,
    user: process.env.PROD_DB_USER,
    database: process.env.PROD_DB_NAME,
    password: process.env.PROD_DB_PASSWORD,
    port: process.env.PROD_DB_PORT,
    // ssl: {
    //     rejectUnauthorized: true,
    //     ca: fs.readFileSync("./ca.pem").toString(),
    // },
} : {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
};

module.exports = new Pool({
    ...config,
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});