const { DataTypes } = require('sequelize')

// HISTORIAL MEDICO
module.exports = (sequelize) => {
    const MedicalHistoryModel = sequelize.define(
        'MedicalHistory',
        {
            id_medicalhistory: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            diagnostic: {
                type: DataTypes.STRING,
            },
            socialWelfare: {
                type: DataTypes.STRING,
            },
            medicationAllergies: {
                type: DataTypes.TEXT,
            },
            currentMedications: {
                type: DataTypes.TEXT,
            },
            previusInjuries: {
                type: DataTypes.TEXT,
            },
            currentSymptoms: {
                type: DataTypes.TEXT,
            },
            notes: {
                type: DataTypes.TEXT
            }
        }
    )

    MedicalHistoryModel.belongsTo(sequelize.models.Patient, {foreignKey: 'id_patient'}); // Establece la relación de clave foránea

    return MedicalHistoryModel;
}