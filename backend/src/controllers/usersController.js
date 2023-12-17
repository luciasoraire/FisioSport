const jwt = require('jsonwebtoken');
const { User } = require('../../db')
const { encrypt, verify } = require('../utils/passwordEncrypt')
const Crypto = require('crypto')
const Sequelize = require('sequelize');

const createUser = async (user) => {
    const userFound = await User.findOne({ where: { email: user.email } })

    if (userFound) return { message: 'Email en uso' }
    const passwordHash = await encrypt(user.password)

    const newUser = await User.create({
        email: user.email,
        password: passwordHash
    })
    return newUser
}

const searchUser = async (email, password) => {
    const user = await User.findOne({
        where: {
            email
        }
    })
    if (!user) return { message: "usuario no registrado" };
    const passwordCompare = await verify(password, user.password)
    if (!passwordCompare) return { message: 'contrasena incorrecta'};

    const token = jwt.sign({ userId: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return {
        authenticated: passwordCompare,
        isAdmin: user.isAdmin,
        email: user.email,
        token: token
    }
}

const loginWithToken = async(email) => {
    const user = await User.findOne({
        where: {
            email
        }
    })
    if (!user) return { message: "usuario no registrado" };

    return {
        authenticated: true,
        isAdmin: user.isAdmin,
        email: user.email
    }
}

// generar token y enviarlo por mail
const generateToken = async(email) => {
    const user = await User.findByPk(email)

    if(!user)
    {
        return {message: 'Este usuario no existe'}
    }

    user.token = Crypto.randomBytes(20).toString('hex')
    const now = new Date();
    user.expire = new Date(now.getTime() + 10 * 60 * 1000);

    await user.save()

    return {message: "listo", token: user.token}
}

// validar token para cuando se cargue la pagina
const validateTokenCtrl = async(token) => {
    const user = await User.findOne({where: {token: token}})

    if(!user)
    {
        return {message: 'Este usuario no existe'}
    }

    const now = new Date();

    if (now > user.expire) {
        return { message: 'El token ha caducado' };
    }
    else {
        return {message: 'Token valido'}
    }

}

// cambiar el password
const createNewPassword = async({token, password}) => {
    const user = await User.findOne({ where: {
        token: token,
    }})
   
    if(!user)
    {
        return {message: 'Este usuario no existe'}
    }
    const now = new Date();

    if (now > user.expire) {
        return { message: 'El token ha caducado' };
    }
    const passwordHash = await encrypt(password)
    user.token = ''
    user.expire = null
    user.password = passwordHash

    await user.save()

    return {message: 'Tu contraseña se ha cambiado con exito'}
    
}



module.exports = {
    createUser,
    searchUser,
    generateToken,
    validateTokenCtrl,
    createNewPassword,
    loginWithToken

}