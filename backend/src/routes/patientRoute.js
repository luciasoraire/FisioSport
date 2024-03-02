const { Router } = require('express')
const {
    getAllPatients,
    createDataPatient,
    updateDataPatient,
    deleteDataPatient,
    getPatientById
} = require('../handlers/patientHandler')

const patientRouter = Router()

patientRouter.get('/', getAllPatients)  // Traer todos los pacientes
patientRouter.get('/info/:userId', getPatientById) // Traer paciente especifico 
patientRouter.post('/', createDataPatient) // Crear paciente
patientRouter.put('/:patientId', updateDataPatient) // Actualizar info paciente
patientRouter.delete('/:patientId', deleteDataPatient) // eliminar paciente

module.exports = patientRouter