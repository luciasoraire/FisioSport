const {
    MedicalHistory,
    Patient
} = require('../../db')

// =========== CONTROLLERS HISTORIAL MEDICO ============

// Traer todos los historial medicos (x)
const allMedicalHistories = async () => {
    const medicalHistories = await MedicalHistory.findAll(
        {
            order: [['id_patient', 'ASC']],
            include: [{
                model: Patient,
                as: 'Patient'
            }]
        }
    )
    return medicalHistories
}

// Traer historial medico
const medicalHistoryByPatientId = async (patientId) => {
    const medicalHistories = await MedicalHistory.findAll(
        {
            where: { id_patient: patientId },
            include: [{
                model: Patient,
                as: 'Patient'
            }]
        }
    )
    return medicalHistories
}

// Crear historial medico
const createMedicalHistory = async ({ diagnostic, notes, id_patient, socialWelfare, medicationAllergies, currentMedications, previusInjuries, currentSymptoms }) => {
    const medicalHistory = await MedicalHistory.findByPk(id_patient)

    if (medicalHistory === null) {
        const medicalHistoryCreated = await MedicalHistory.create({
            diagnostic,
            notes,
            id_patient,
            socialWelfare,
            medicationAllergies,
            currentMedications,
            previusInjuries,
            currentSymptoms
        })
        return medicalHistoryCreated
    }
    else {
        data = {
            diagnostic,
            notes,
            id_patient,
            socialWelfare,
            medicationAllergies,
            currentMedications,
            previusInjuries,
            currentSymptoms
        }
        updateHistory(data, medicalHistory.id_medicalhistory)
    }
}

// Actualizar historial medico
const updateHistory = async (data, historyId) => {
    const [rowsUpdated, [updatedMedicalHistory]] = await MedicalHistory.update(data, { where: { id_medicalhistory: historyId }, returning: true })
    if (rowsUpdated === 1 && updatedMedicalHistory) {
        return updatedMedicalHistory
    } else {
        return null;
    }
}

// Eliminar historial medico
const deleteHistory = async (historyId) => {
    const dataDeleted = await MedicalHistory.destroy({ where: { id_medicalhistory: historyId }, returning: true })
    return dataDeleted
}

module.exports = {
    allMedicalHistories,
    createMedicalHistory,
    updateHistory,
    deleteHistory,
    medicalHistoryByPatientId
}