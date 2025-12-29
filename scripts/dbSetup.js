
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { Client } = require("pg");





const connectionString =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL
    : process.env.DEV_DB_URL;

const ssl =
  process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false;





const client = new Client({ connectionString, ssl });

async function main() {
  try {
    await client.connect();
    console.log(`Connected to database`);


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

console.log("NODE_ENV =", process.env.NODE_ENV);
console.log("DATABASE_URL exists =", !!process.env.DATABASE_URL);


main();
