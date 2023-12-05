const { allMedicalHistories, createMedicalHistory, updateHistory, deleteHistory, medicalHistoryByPatientId } = require("../controllers/medicalHistoryController")


const getMedicalHistory = async (req, res) => {
    try {
        const medicalHistories = await allMedicalHistories()
            res.status(200).json(medicalHistories)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getMedicalHistoryByPatient = async (req, res) => {
    try {
        const { patientId} = req.params
        const medicalHistory = await medicalHistoryByPatientId(patientId)
            res.status(200).json(medicalHistory)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const createNewMedicalHistory = async (req, res) => {
    try {
        const { diagnostic, notes, id_patient, socialWelfare, medicationAllergies, currentMedications, previusInjuries, currentSymptoms } = req.body
        
        const newMedicalHistory = await createMedicalHistory({diagnostic, notes, id_patient, socialWelfare, medicationAllergies, currentMedications, previusInjuries, currentSymptoms  })
            res.status(200).json(newMedicalHistory)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const updateMedicalHistory = async (req, res) => {
    try {
        const { historyId } = req.params
        const { data } = req.body 
        const medicalHistoryUpdated = await updateHistory(data, historyId)
            res.status(200).json(medicalHistoryUpdated)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const deleteMedicalHistory = async (req, res) => {
    try {
        const { historyId } = req.params
        const medicalHistoryDeleted = await deleteHistory(historyId)
            res.status(200).json(medicalHistoryDeleted)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getMedicalHistory,
    createNewMedicalHistory,
    updateMedicalHistory,
    deleteMedicalHistory,
    getMedicalHistoryByPatient
}