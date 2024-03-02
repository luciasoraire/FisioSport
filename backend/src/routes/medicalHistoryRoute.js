const { Router } = require('express')
const { 
    getMedicalHistory, 
    createNewMedicalHistory, 
    updateMedicalHistory, 
    deleteMedicalHistory, 
    getMedicalHistoryByPatient 
} = require('../handlers/medicalHistoryHandler')

const medicalHistoryRouter = Router()

medicalHistoryRouter.get('/', getMedicalHistory) // Traer todos los historiales medicos (x)
medicalHistoryRouter.get('/:patientId', getMedicalHistoryByPatient) // Traer historial medico
medicalHistoryRouter.post('/', createNewMedicalHistory) // Crear historial medico
medicalHistoryRouter.put('/:historyId', updateMedicalHistory) // Modificar informacion del historial
medicalHistoryRouter.delete('/:historyId', deleteMedicalHistory) // Eliminar historial medico

module.exports = medicalHistoryRouter