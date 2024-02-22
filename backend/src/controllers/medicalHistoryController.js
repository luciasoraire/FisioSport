const { MedicalHistory, Patient } = require('../../db')

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

const medicalHistoryByPatientId = async (patientId) => {
    const medicalHistories = await MedicalHistory.findAll(
        {
            where: {id_patient: patientId},
            include: [{
                model: Patient,
                as: 'Patient'
            }]
        }
    )
    return medicalHistories
}

const createMedicalHistory = async ({ diagnostic, notes, id_patient, socialWelfare, medicationAllergies, currentMedications, previusInjuries, currentSymptoms  }) => {
    const medicalHistory = await MedicalHistory.findByPk(id_patient)
    console.log(medicalHistory);
    if(medicalHistory === null)
    {
        console.log('entre a crear');
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
    else
    {
        console.log('entre a actualizar');
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

const updateHistory = async (data, historyId) => {
    const [rowsUpdated, [updatedMedicalHistory]] = await MedicalHistory.update(data, { where: { id_medicalhistory: historyId }, returning: true })
    if (rowsUpdated === 1 && updatedMedicalHistory) {
        return updatedMedicalHistory
    } else {
        return null;
    }
}

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