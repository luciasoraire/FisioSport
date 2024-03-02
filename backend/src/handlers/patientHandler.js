const {
    allPatients,
    createData,
    updateData,
    deleteData,
    getPatient
} = require("../controllers/patientController")

// Traer todos los pacientes
const getAllPatients = async (req, res) => {
    try {
        const patients = await allPatients()
        res.status(200).json(patients)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Traer paciente especifico 
const getPatientById = async (req, res) => {
    try {
        const { userId } = req.params

        const patient = await getPatient(userId)
        res.status(200).json(patient)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// crear paciente
const createDataPatient = async (req, res) => {
    try {
        const { name, lastname, phone, dni, email, age, gender } = req.body
        const dataCreated = await createData({ name, lastname, phone, dni, email, age, gender })
        res.status(200).json(dataCreated)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// actualizar informacion paciente
const updateDataPatient = async (req, res) => {
    try {
        const { patientId } = req.params
        const { patient } = req.body
        const dataUpdated = await updateData(patient, patientId)
        res.status(200).json(dataUpdated)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// eliminar paciente
const deleteDataPatient = async (req, res) => {
    try {
        const { patientId } = req.params
        const dataDeleted = await deleteData(patientId)
        res.status(200).json(dataDeleted)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getAllPatients,
    createDataPatient,
    updateDataPatient,
    deleteDataPatient,
    getPatientById
}