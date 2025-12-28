const { Router } = require('express')
const messageController = require('../controllers/messageController')
const messageRouter = Router();

messageRouter.get('/:messageId', messageController.getMessageDetails);

module.exports = messageRouter

