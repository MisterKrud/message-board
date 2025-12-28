const db = require('../db/queries')
const links = require('../links')
const { body, validationResult, matchedData } = require("express-validator")

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


const validateNewPost = [
    body("messageText").trim()
    .isLength({min: 1, max: 1000}).withMessage('Post must be between 1 and 1000 characters'),
    body("messageUser").trim()
    .isAlphanumeric().withMessage('Username can only contain alphanumeric characters')
    .isLength({min: 3, max: 20}).withMessage('Username must be between 3 and 20 characters long')
]



const postNewMessage = [ 
  validateNewPost, async (req, res) => {
    const errors = validationResult(req);
    console.log(validationResult(req))
    if(!errors.isEmpty()){
      return res.status(400).render("form", {
        title: "New Message",
        errors: errors.array(),
      })
    }
    const { messageText, messageUser } = matchedData(req)
    const added = new Date();
   await db.postNewMessage(messageText, messageUser, added)
    res.redirect('/');

}
];

module.exports = { 
  getMessageDetails,
  postNewMessage,
  validateNewPost,
 }