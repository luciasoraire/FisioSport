const {
    Patient,
    MedicalHistory
} = require('../../db')

// ============ CONTROLLERS PACIENTES =============

// Traer todos los pacientes
const allPatients = async () => {
    const patients = await Patient.findAll({ order: [['id_patient', 'ASC']] })
    return patients
}

// traer paciente especifico 
const getPatient = async (userId) => {
    const patient = await Patient.findOne({
        where: { email: userId }
    });

    return patient;
};

// crear paciente
const createData = async ({ name, lastname, phone, dni, email, age }) => {

    const dataCreated = await Patient.create({
        name,
        lastname,
        phone,
        dni,
        email,
        age
    })

    return dataCreated
}

// actualizar informacion paciente
const updateData = async (patient, patientId) => {

    const [rowsUpdated, [updatedData]] = await Patient.update(patient, { where: { id_patient: patientId }, returning: true })
    if (rowsUpdated === 1 && updatedData) {
        return updatedData
    } else {
        return null;
    }
}

// eliminar paciente 
const deleteData = async (patientId) => {

    //const deleteAppointments = await Appointment.destroy({where: {id_patient: patientId}, returning: true})
    const deleteMedicalHistory = await MedicalHistory.destroy({ where: { id_patient: patientId }, returning: true })
    const dataDeleted = await Patient.destroy({ where: { id_patient: patientId }, returning: true })

    return dataDeleted
}

module.exports = {
    allPatients,
    createData,
    updateData,
    deleteData,
    getPatient
}