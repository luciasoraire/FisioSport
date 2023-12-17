const { Router } = require('express')
const { registerUser, loginUser, sendToken, validateToken, updatePassword, loginUserToken } = require('../handlers/usersHandler')
const verifyToken = require('../middleware/verifyToken')

const userRouter = Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/login-token', verifyToken, loginUserToken)

userRouter.post('/forgot-password', sendToken)
userRouter.get('/reset-password/:token', validateToken)
userRouter.post('/reset-password/:token', updatePassword)

module.exports = userRouter