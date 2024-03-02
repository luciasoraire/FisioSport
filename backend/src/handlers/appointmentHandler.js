const { 
    allAppointments, 
    getDisponibilityHour, 
    createNewAppointment, 
    updateAppointmentCtrl, 
    deleteAppointmentCtrl 
} = require("../controllers/appointmentController")

// Traer todos los turnos
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await allAppointments()
            res.status(200).json(appointments)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Verificar disponibilidad del turno seleccionado
const getDisponibility = async (req, res) => {
    try {
        const { selectedDate } = req.body
        const disponibility = await getDisponibilityHour(selectedDate)
            res.status(200).json(disponibility)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Crear turno
const createAppointment = async (req, res) => {
    try {
        const { date, hour, dni, name, surname, email, phone } = req.body
      
        const newAppointment = await createNewAppointment(date, hour, dni, name, surname, email, phone)
            res.status(200).json(newAppointment)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Actualizar turno
const updateAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params
        const { data } = req.body

        const appointmentUpdated = await updateAppointmentCtrl(data, appointmentId)
            res.status(200).json(appointmentUpdated)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Eliminar turno
const deleteAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params
        const appointmentDeleted = await deleteAppointmentCtrl(appointmentId)
            res.status(200).json(appointmentDeleted)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getAllAppointments,
    getDisponibility,
    createAppointment,
    updateAppointment,
    deleteAppointment
}