
const { Router } = require('express')
const indexRouter = Router();
const db = require('../db/queries.js')
const searchControllers = require("../controllers/searchControllers")
const messageControllers = require("../controllers/messageController.js")
const messages = db.messages

const links = require('../links')
// indexRouter.get('/', (req, res) => {
//     res.render('index', { title: 'Mini Messageboard', messages: messages, links: links })

// })

indexRouter.get("/", searchControllers.getAllMessagePosts)

indexRouter.get('/new', (req, res) => {
    res.render('form', { 
        title: "New message"
     })
})

indexRouter.post('/new', messageControllers.postNewMessage)

indexRouter.get("/userSearchResults", searchControllers.searchUsers)
indexRouter.get("/messageSearchResults", searchControllers.searchMessages)

module.exports = indexRouter;