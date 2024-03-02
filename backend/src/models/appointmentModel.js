const { DataTypes } = require('sequelize')

// TURNOS
module.exports = (sequelize) => {
    const AppointmentModel = sequelize.define(
        'Appointment',
        {
            id_appointment: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            date: {
                type: DataTypes.DATE,
            },
            hour: {
                type: DataTypes.STRING
            },
            dni: {
                type: DataTypes.STRING
            },
            name: {
                type: DataTypes.STRING
            },
            surname: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING
            },
            phone: {
                type: DataTypes.STRING
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        }
    )

    return AppointmentModel;
}