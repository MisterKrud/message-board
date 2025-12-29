
require("dotenv").config();
const { Client } = require("pg");
const fs = require("fs");

const env = process.argv[2] || "development";

let connectionString;
let ssl;

console.log(process.env.PROD_DB_URL)

if (env === "production") {
  connectionString = process.env.DATABASE_URL;
  ssl = { rejectUnauthorized: false };
} else {
  connectionString = process.env.DEV_DB_URL;
  ssl = false;
}

const client = new Client({ connectionString, ssl });

async function main() {
  try {
    await client.connect();
    console.log(`Connected to ${env} database`);

    // Example table creation
    await client.query(`
      CREATE TABLE IF NOT EXISTS messages(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR (20),
  message TEXT NOT NULL, added TIMESTAMP
);

INSERT INTO messages (username, message, added)
 VALUES
 ('Montgomery', 'Hi there!', NOW()),
('Agatha', 'Hello everyone', NOW());
    `);

    console.log("Database setup complete!");
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

main();
