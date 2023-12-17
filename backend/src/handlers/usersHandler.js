const { createUser, searchUser, generateToken, validateTokenCtrl, createNewPassword, loginWithToken } = require("../controllers/usersController")

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await searchUser(email, password)
        
        if (user.authenticated) {
            // Configurar la cookie con el token
            res.cookie('token', user.token, { httpOnly: false, expiresIn: 3600000, secure: true /* 1 hora en milisegundos */ });
            
            // Enviar las otras propiedades en el cuerpo de la respuesta JSON
            res.status(200).json({
              authenticated: user.authenticated,
              isAdmin: user.isAdmin,
              email: user.email
            });
          } else {
            console.log(user);
            res.status(401).json(user);
          }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const createdUser = await createUser({ email, password })
        res.status(200).json(createdUser)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const loginUserToken = async(req, res) => {
    try {
        const { email } = req.body
        const user = await loginWithToken(email)
        console.log(user);
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const sendToken = async (req, res) => {
    try {
        const { email } = req.body
        const sendedToken = await generateToken(email)
        res.status(200).json(sendedToken)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const validateToken = async (req, res) => {
    try {
        const { token } = req.params
        const tokenValidated = await validateTokenCtrl(token)
        res.status(200).json(tokenValidated)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updatePassword = async (req, res) => {
    try {
        const { token } = req.params
        const { password } = req.body
        const changedPassword = await createNewPassword({token, password})
        res.status(200).json(changedPassword)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}





module.exports = {
    registerUser,
    loginUser,
    sendToken,
    validateToken,
    updatePassword,
    loginUserToken
}