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
    host: process.env.DEV_DB_HOST,
    user: process.env.DEV_DB_USER,
    database: process.env.DEV_DB_NAME,
    password: process.env.DEV_DB_PASSWORD,
    port: process.env.DEV_DB_PORT,
};

module.exports = new Pool({
    ...config,
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});