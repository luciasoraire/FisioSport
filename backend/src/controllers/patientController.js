const { Patient, User, Appointment, MedicalHistory } = require('../../db')

const allPatients = async () => {
    const patients = await Patient.findAll({ order: [['id_patient', 'ASC']] })
    return patients
}

const getPatient = async (userId) => {
    const patient = await Patient.findOne({
        where: { email: userId }
    });
    console.log(patient);
    return patient;
};

const createData = async ({ name, lastname, phone, dni, email, age }) => {
    const existingPatient = await Patient.count({where: {email: email}})

    if (existingPatient !== 0)
    {
        console.log(existingPatient);
        return {message: 'Solo puedes cargar tu informacion una vez'}
    }

    const dataCreated = await Patient.create({
        name,
        lastname,
        phone,
        dni,
        email,
        age
    })
    console.log(createData);
    return dataCreated 
}

const updateData = async (patient, patientId) => {
    console.log(patient);
    const [rowsUpdated, [updatedData]] = await Patient.update(patient, { where: { id_patient: patientId }, returning: true })
    if (rowsUpdated === 1 && updatedData) {
        return updatedData
    } else {
        return null;
    }
}

const deleteData = async (patientId) => {
    console.log(patientId);
    const deleteAppointments = await Appointment.destroy({where: {id_patient: patientId}, returning: true})
    const deleteMedicalHistory = await MedicalHistory.destroy({where: {id_patient: patientId}, returning: true}) 
    const dataDeleted = await Patient.destroy({where: {id_patient: patientId}, returning: true})

    return dataDeleted
}

module.exports = {
    allPatients,
    createData,
    updateData,
    deleteData,
    getPatient
}