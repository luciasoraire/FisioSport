import './AppointmentPage.css'
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2'

const AppointmentPage = () => {

    const [date, setDate] = useState(null);
    const [hour, setHour] = useState('')
    const [disponibility, setDisponibility] = useState([])
    const patientInfo = useSelector(state => state.patientInfo)


    // deshabilitar los dias que ya pasaron
    const today = new Date();

    // deshabilitar los fines de semana
    const isWeekend = date => date.getDay() === 0 || date.getDay() === 6; // Domingo (0) y Sábado (6)

    // Cambiar la fecha 
    const onChange = async (newDate) => {
        setDate(newDate);
        const response = await axios.post('http://localhost:3001/fisiosport/appointment/disponibility', {
            selectedDate: newDate
        })
        setDisponibility(response.data)
    };

    // Array con los horarios de 9am a 6pm
    const horarios = [];
    for (let i = 9; i <= 18; i++) {
        horarios.push(`${i < 10 ? '0' + i : i}:00`); // Agrega los horarios al array
    }

    const reserveAppointment = async () => {
        if (date !== null && hour !== '') {
            const response = await axios.post('http://localhost:3001/fisiosport/appointment', {
                date,
                hour,
                id_patient: patientInfo?.id_patient
            })
            
            response.data.message 
            ? Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.data.message,
              })
            : response.data && Swal.fire({
                title: "Turno reservado!",
                text: "Te esperamos!",
                icon: "success"
            });
        }
        else
        {   
            if(!patientInfo.id_patient) Swal.fire("Tienes que ingresar tu informacion personal!");
            else if(date === null && hour === '') Swal.fire("Tienes que seleccionar una fecha y una hora!");
            else if(hour === '') Swal.fire("Tienes que seleccionar una hora!");
            else Swal.fire("Tienes que seleccionar una fecha!")     
        }
    }

    const cancelAppointment = () => {
        setDate(null)
        setHour('')
        setDisponibility([])
    }

    return (
        <div className='containerAppointment'>
            {/* MUESTRA LA FECHA Y HORARIOS SELECCIONADOS */}
            <div className='containerCalendarAndInfo'>

                {/* CONTENEDOR DEL CALENDARIO Y HORARIOS */}
                <div className='containerCalendar'>

                    <Calendar
                        className='calendar'
                        onChange={onChange}
                        value={date}
                        minDate={today}
                        tileClassName={({ date, view }) => {
                            if (view === 'month') {
                                if (isWeekend(date) || date < today) {
                                    return 'disabled'; // Agrega la clase 'disabled' a los días deshabilitados
                                }
                            }
                        }}

                    />
                    <div className='containerTime'>
                        <div className='titleTime'>
                            <p>Horarios</p>
                        </div>
                        <div className='containerHours'>
                            {horarios.map((horario, index) => (
                                <button
                                    className='hours'
                                    key={index}
                                    onClick={() => setHour(horario)}
                                    disabled={disponibility.some(item => item.hour === horario && item.total_people === '4') || !date}
                                >
                                    {horario}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                {<div className='appointmentDetail'>
                    <p className='appointmentDetail-title'>Detalles del turno</p>
                    <div className='containerDetail'>
                        <p><span>Direccion:</span> Álvarez Condarco 1205, altura Av. Coronel Suárez 1200</p>
                        <p><span>Telefono:</span> 3813545337</p>
                        <p><span>Email:</span> kinchristianfabian@gmail.com</p>
                        <p><span>Fecha:</span> {date && date.toLocaleDateString()}</p>
                        <p><span>Hora:</span> {date && hour}</p>
                    </div>

                </div>}
            </div>
            {/* CONTENEDOR BOTONES PARA RESERVAR O CANCELAR EL TURNO */}
            <div className='containerButtonsCalendar'>
                <button onClick={reserveAppointment}>Confirmar turno</button>
                <button onClick={cancelAppointment}>Cancelar turno</button>
            </div>
        </div>
    )
}

export default AppointmentPage