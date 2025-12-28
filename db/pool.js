require("dotenv").config()
const { Pool } = require("pg");

module.exports = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

/*
module.exports = new Pool({
connectionString: DB_CONNECTIONSTRING
});
*/