const { Router } = require('express')
const { 
    getAllAppointments, 
    getDisponibility, 
    createAppointment, 
    updateAppointment, 
    deleteAppointment 
} = require('../handlers/appointmentHandler')

const appointmentRouter = Router()

appointmentRouter.get('/all', getAllAppointments)   // TODOS LOS TURNOS
appointmentRouter.post('/disponibility', getDisponibility)   // DISPONIBILIDAD DE HORARIOS SEGUN LA FECHA SELECCIONADA
appointmentRouter.post('/', createAppointment)   // RESERVAR UN TURNO
appointmentRouter.put('/:appointmentId', updateAppointment)  // ACTUALIZAR UN TURNO
appointmentRouter.delete('/:appointmentId', deleteAppointment)  // ELIMINAR UN TURNO

module.exports = appointmentRouter