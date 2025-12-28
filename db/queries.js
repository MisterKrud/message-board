const pool = require("./pool");

async function getAllMessagePosts() {
    const { rows } = await pool.query("SELECT * FROM messages")
    return rows;
}

async function getAllUsernames() {
    const {rows } = await pool.query("SELECT username FROM messages")
        return rows
}

async function searchMessages(str) {
    if(str){
    const { rows } = await pool.query("SELECT * FROM messages WHERE message ILIKE $1", [`%${str}%`]);
    return rows
    } else {
        null;
    }
}

async function searchUsers(user) {
    const { rows } = await pool.query("SELECT * FROM messages WHERE username ILIKE $1", [`%${user}%`]);
    return rows;
}

async function getMessageDetails(id) {
    const {rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [id]);
   const row = rows[0]
    return row
}

async function postNewMessage(text, user, timestamp) {
    await pool.query("INSERT INTO messages (message, username, added) VALUES ($1, $2, $3)", [text, user, timestamp]);
}

module.exports = {
    getAllMessagePosts,
    getAllUsernames,
    searchMessages,
    searchUsers,
    getMessageDetails,
    postNewMessage
}