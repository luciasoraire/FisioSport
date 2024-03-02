const cron = require('node-cron');
const { Op } = require('sequelize');
const { Appointment } = require('./db');

// actualizar estados de los turnos automaticamente
cron.schedule('* * * * *', async () => {
    try {

        const now = new Date();
        // Actualiza los turnos que están activos 
        const updatedRows = await Appointment.update(
            { active: false },
            {
                where: {
                    active: true,
                    date: {
                        [Op.lt]: now, 
                    },
                },
            }
        );
 
        //console.log(`Se actualizaron ${updatedRows[0]} turnos.`);
    } catch (error) {
        console.error('Error al actualizar los turnos:', error);
    }
}); 