const db = require('../db')



const getMessage = async (req, res)=> {
  const  {messageId} = req.params

  const message = await db.getMessage(messageId)
  console.log('messageId:', messageId);
console.log('messages:', db.messages);
if (!message) {
    return res.status(404).send("Message not found")
}

  res.render('messageView', { message})
}
module.exports = {getMessage}