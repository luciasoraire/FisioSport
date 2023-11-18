const {hash, compare} = require('bcryptjs')

const encrypt = async(password) => {
    const passwordHash = await hash(password, 5)
    return passwordHash
};

const verify = async(password, passwordHash) => {
    const isCorrect = await compare(password, passwordHash)
    return isCorrect
};

module.exports = {
    encrypt,
    verify
}