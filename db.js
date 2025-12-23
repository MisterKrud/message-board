const messages = [
    {
        id: crypto.randomUUID(),
        text: 'Hi there!',
        user: 'Tony',
        added: new Date()
    },
    {
        id: crypto.randomUUID(),
        text: 'Well.. Hello',
        user: 'Sally',
        added: new Date()
    }
]

async function getMessage(id) {
    return messages.find(message => message.id === id)
}


module.exports = {messages, getMessage}