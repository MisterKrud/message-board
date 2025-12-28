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
    const { rows } = await pool.query("SELECT message FROM messages WHERE message ILIKE $1", [`%${str}%`]);
}

async function searchUsers(user) {
    const { rows } = await pool.query("SELECT username FROM messages WHERE username LIKE $1", [`%${user}%`]);
}

module.exports = {
    getAllMessagePosts,
    getAllUsernames,
    searchMessages,
    searchUsers
}