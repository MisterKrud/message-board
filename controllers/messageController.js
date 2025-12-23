const db = require('../db')


async function getMessage(req, res) {
    const {messageId} = req.params;

    const message = await db.getMessage(messageId)

    res.send(`Message: ${message.text}, Sent By: ${message.user}, Timestamp: ${message.added}`)
}

module.exports = {getMessage}