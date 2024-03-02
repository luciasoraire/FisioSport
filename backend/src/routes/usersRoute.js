const { Router } = require('express')
const {
    registerUser,
    loginUser,
    sendToken,
    validateToken,
    updatePassword,
    loginUserToken
} = require('../handlers/usersHandler')
const verifyToken = require('../middleware/verifyToken')

const userRouter = Router()

userRouter.post('/register', registerUser)  // Registro usuario
userRouter.post('/login', loginUser) // Login usuario
userRouter.post('/login-token', verifyToken, loginUserToken) // ????

userRouter.post('/forgot-password', sendToken) // Enviar token de recuperacion a Email
userRouter.get('/reset-password/:token', validateToken) // Validar si el token es valido
userRouter.post('/reset-password/:token', updatePassword) // Cambiar password

module.exports = userRouter