require("dotenv").config()
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  message VARCHAR ( 255 ), added TIMESTAMP
);

INSERT INTO messages (username, message, added)
 VALUES
 ('Montgomery', 'Hi there!', NOW()),
('Agatha', 'Hello everyone', NOW());
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: DB_CONNECTIONSTRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();