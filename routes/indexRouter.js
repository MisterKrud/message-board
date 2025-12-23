
const {Router} = require('express')
const indexRouter = Router();
const db = require('../db.js')
const messages = db.messages

indexRouter.get('/', (req, res) => {
    res.render('index', {title: 'Mini Messageboard', messages: messages} )
    
})

indexRouter.get('/new', (req, res) =>{
    res.render('form')
})

indexRouter.post('/new', (req, res) =>{
         const {messageText, messageUser } = req.body
            messages.push({id: crypto.randomUUID(), text: messageText, user: messageUser, added: new Date()})
            res.redirect('/');
                
})
module.exports = indexRouter;