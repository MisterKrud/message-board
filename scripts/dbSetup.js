require("dotenv").config();
const { Client } = require("pg");
const fs = require("fs");

// Read environment from command line
const env = process.argv[2]; // e.g., "development" or "production"
if (!env) {
  console.error("Usage: node dbSetup.js <development|production>");
  process.exit(1);
}

// Decide connection config based on environment
let config;
if (env === "development") {
  config = {
    connectionString: process.env.DEV_DATABASE_URL,
  };
} else if (env === "production") {
  config = {
    connectionString: process.env.PROD_DATABASE_URL,
    ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync("./ca.pem").toString(),
    },
  };
} else {
  console.error("Invalid environment. Use 'development' or 'production'");
  process.exit(1);
}

const client = new Client(config);

async function main() {
  try {
    await client.connect();
    console.log(`Connected to ${env} database`);

    // Example: create table if not exists
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
    console.error("Error:", err);
  } finally {
    await client.end();
  }
}

main();