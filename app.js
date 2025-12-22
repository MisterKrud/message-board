const express = require('express');
const app = express();
const path = require('node:path')
const assetsPath = path.join(__dirname, 'public')

const messages = [
    {
        text: 'Hi there!',
        user: 'Lenore',
        added: new Date()
    },
    {
        text: 'Well.. Hello',
        user: 'Allyn',
        added: new Date()
    }
]

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(assetsPath));
app.get('/', (req, res) => {
    res.render('index', {title: 'Mini Messageboard', messages: messages})
})

const PORT = 3000

app.listen(PORT, (error) => {
    if (error) {
        throw error
    }
    console.log(`Webserver active on port: ${PORT}`)
})