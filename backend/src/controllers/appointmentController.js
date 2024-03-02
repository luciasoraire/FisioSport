const { Appointment } = require('../../db')
const { Sequelize } = require('sequelize');
const moment = require('moment');

// ================ CONTROLLERS TURNOS ==============

// Traer todos los turnos
const allAppointments = async () => {

    const appointments = await Appointment.findAll(
        {
            order: [['id_appointment', 'ASC']],
        }
    )
    const appointmentsClean = appointments.map(appointment => {
        // Copiar el objeto original
        const nuevoAppointment = { ...appointment.dataValues };

        // Convertir la fecha en el objeto principal
        const fechaOriginal = new Date(appointment.date);
        const dia = fechaOriginal.getDate();
        const mes = fechaOriginal.getMonth() + 1;
        const ano = fechaOriginal.getFullYear();
        nuevoAppointment.date = `${dia}/${mes}/${ano}`;

        // Convertir la fecha en el objeto "Patient"
        if (appointment.Patient && appointment.Patient.createdAt) {
            const fechaOriginalPatient = new Date(appointment.Patient.createdAt);
            const diaPatient = fechaOriginalPatient.getDate();
            const mesPatient = fechaOriginalPatient.getMonth() + 1;
            const anoPatient = fechaOriginalPatient.getFullYear();
            nuevoAppointment.Patient.createdAt = `${diaPatient}/${mesPatient}/${anoPatient}`;
        }

        return nuevoAppointment;
    });

    return appointmentsClean
}

// Verificar disponibilidad del turno seleccionado
const getDisponibilityHour = async (selectedDate) => {
    const turnosPorFecha = await Appointment.findAll({
        where: {
            date: selectedDate,
            // Otras condiciones si es necesario
        },
        attributes: [
            'hour',
            [Sequelize.literal('COUNT(*)'), 'total_people']
        ],
        group: ['hour'],
    });

    return turnosPorFecha
}

// Crear nuevo turno
const createNewAppointment = async (date, hour, dni, name, surname, email, phone) => {

    const existingAppointmentsCount = await Appointment.count({
        where: {
            date,
            hour,
        }
    });

    if (existingAppointmentsCount >= 4) {
        return { message: 'No se pueden agregar más citas para esta fecha y hora' };
    }

    const appointmentsCreated = await Appointment.create({
        date,
        hour,
        name,
        dni,
        surname,
        email,
        phone
    })
    return appointmentsCreated
}

// Modificar el turno
const updateAppointmentCtrl = async (data, appointmentId) => {

    if (data.hour === '') delete data.hour
    if (data.date === '') delete data.date
    const [rowsUpdated, [updatedAppointments]] = await Appointment.update(data, {
        where: { id_appointment: appointmentId },
        returning: true,
    })

    if (rowsUpdated === 1 && updatedAppointments) {
        const formattedDate = moment(updatedAppointments.date).format('D/M/YYYY');
        const appointment = await Appointment.findOne({ where: { id_appointment: appointmentId } })
        const updatedAppointmentToSend = {
            id_appointment: updatedAppointments.id_appointment,
            date: formattedDate,
            hour: updatedAppointments.hour,
            email: appointment.email,
            name: appointment.name,
            surname: appointment.surname,
            phone: appointment.phone,
            dni: appointment.dni,
            active: appointment.active,
            createdAt: updatedAppointments.createdAt,
            updatedAt: updatedAppointments.updatedAt,
        };
        
        return updatedAppointmentToSend;
    } else {
        return null;
    }
}

// Eliminar un turno
const deleteAppointmentCtrl = async (appointmentId) => {
    const dataDeleted = await Appointment.destroy({ where: { id_appointment: appointmentId }, returning: true })
    return dataDeleted
}

module.exports = {
    allAppointments,
    getDisponibilityHour,
    createNewAppointment,
    updateAppointmentCtrl,
    deleteAppointmentCtrl
}