const db = require('../db/queries')
const links = require('../links')

const getMessageDetails = async (req, res) => {
  console.log("rew.params: ", req.params.messageId)
  const messageId  = Number(req.params.messageId)

  const message = await db.getMessageDetails(messageId)
  console.log('messageId:', messageId);
  console.log(message)
 
  if (!message) {
    return res.status(404).send("Message not found")
  }

  res.render('messageView', { 
    message: message })
}


const postNewMessage = async (req, res) => {
    const { messageText, messageUser } = req.body
    const added = new Date();
   await db.postNewMessage(messageText, messageUser, added)
    res.redirect('/');

}


module.exports = { 
  getMessageDetails,
  postNewMessage
 }