const { DataTypes } = require('sequelize')

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
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        }
    )

    AppointmentModel.belongsTo(sequelize.models.Patient, {foreignKey: 'id_patient'}); // Establece la relación de clave foránea

    return AppointmentModel;
}