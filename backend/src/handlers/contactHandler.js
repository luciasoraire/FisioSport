const { sendMessageController } = require('../controllers/contactController')

// Enviar mensaje a Email
const sendMessageHandler = async (req, res) => {
    try {
        const { data } = req.body

        const messageSend = await sendMessageController(data)
        res.status(200).json(messageSend)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    sendMessageHandler
}