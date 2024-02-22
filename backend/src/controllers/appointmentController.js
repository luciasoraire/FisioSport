const { Appointment, Patient, sequelize  } = require('../../db')
const { Sequelize } = require('sequelize');
const moment = require('moment');
const { Op } = require('sequelize');
const { startOfDay, endOfDay } = require('date-fns');

const allAppointments = async () => {

    const appointments = await Appointment.findAll(
        {
            order: [['id_appointment', 'ASC']],
            include: [
                {
                    model: Patient,
                    as: 'Patient'
                }
            ]
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

const createNewAppointment = async (date, hour, id_patient) => {
    
    // límite de 1 turno por día
    const currentDate = new Date();
   
    const existingAppointment = await Appointment.findOne({
        where: {
            id_patient,
            createdAt: {
                [Op.gte]: startOfDay(currentDate),
                [Op.lt]: startOfDay(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)), // Fin del día actual
            },
        },
    });

    if (existingAppointment) {
        return { message: 'Solo se permite programar un turno por día' };
    }

    // Limite de 4 turnos por mes
    const currentMonth = new Date().getMonth() + 1;
    const existingAppointmentsCountThisMonth = await Appointment.count({
        where: {
            id_patient,
            createdAt: {
                [Op.and]: [
                    sequelize.literal(`EXTRACT(MONTH FROM "createdAt") = ${currentMonth}`),
                    sequelize.literal(`EXTRACT(YEAR FROM "createdAt") = ${new Date().getFullYear()}`),
                ],
            },
        },
    });

    if (existingAppointmentsCountThisMonth >= 4) {
        return { message: 'No se pueden agregar más de 4 citas por mes' };
    }

    // Limite de 4 turnos para una misma fecha y hora
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
        id_patient,
        
    })
    return appointmentsCreated
}

const updateAppointmentCtrl = async (data, appointmentId) => {
    if (data.hour === '') delete data.hour
    if(data.date === '') delete data.date
    const [rowsUpdated, [updatedAppointments]] = await Appointment.update(data, {
        where: { id_appointment: appointmentId },
        returning: true,
        include: [
            {
                model: Patient,
                as: 'Patient'
            }
        ]
    })

    if (rowsUpdated === 1 && updatedAppointments) {
        const formattedDate = moment(updatedAppointments.date).format('D/M/YYYY');

        // Crear una nueva propiedad dateFormatted en el objeto que enviarás al frontend
        const patientData = await Patient.findByPk(updatedAppointments.id_patient);
       
        // Incluir datos del paciente en el objeto que enviarás al frontend
        const updatedAppointmentToSend = {
            id_appointment: updatedAppointments.id_appointment,
            date: formattedDate,
            hour: updatedAppointments.hour,
            createdAt: updatedAppointments.createdAt,
            updatedAt: updatedAppointments.updatedAt,
            id_patient: updatedAppointments.id_patient,
            Patient: patientData.toJSON(), // Convertir a objeto JSON
        };

        return updatedAppointmentToSend;
    } else {
        return null;
    }
}

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