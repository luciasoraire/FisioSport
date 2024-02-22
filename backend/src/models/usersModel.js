const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
        'User',
        {
            email: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            password: {
                type: DataTypes.STRING,
            },
            token: {
                type: DataTypes.STRING,
            },
            expire: {
                type: DataTypes.DATE
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        }
    )
}