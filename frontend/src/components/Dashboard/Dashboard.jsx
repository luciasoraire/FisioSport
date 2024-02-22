import { useSelector } from 'react-redux';
import './Dashboard.css';
import { FaUsers } from 'react-icons/fa';
import { IoCalendarNumberSharp } from 'react-icons/io5';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
const Dashboard = () => {
    const patients = useSelector(state => state.patients);
    const appointments = useSelector(state => state.appointments);
    const [turnosSemana, setTurnosSemana] = useState([]);

    const today = new Date();
    const currentDay = today.getDay();
    const difference = currentDay === 0 ? -6 : 1;

    const firstDay = new Date(today.setDate(today.getDate() - difference));
    const lastDay = new Date(today.setDate(today.getDate() + (4 - difference)));

    useEffect(() => {
        const turnosSemanaActual = appointments.filter(turno => {
            const [day, month, year] = turno.date.split('/');
            const turnoDate = new Date(`${month}/${day}/${year}`);
            return turnoDate >= firstDay && turnoDate <= lastDay;
        });

        setTurnosSemana(turnosSemanaActual);
    }, [appointments]);

    const pacientesAtendidosPorDia = (dia) => {
        return turnosSemana.filter(turno => obtenerDiaSemana(turno.date) === dia).length;
    };

    // Función auxiliar para obtener el día de la semana a partir de una fecha
    const obtenerDiaSemana = (fecha) => {
        const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const [day, month, year] = fecha.split('/');
        const fechaDate = new Date(`${month}/${day}/${year}`);
        return diasSemana[fechaDate.getDay()];
    };

    const [data, setData] = useState({
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
        datasets: [
            {
                label: 'Turnos',
                data: [0, 0, 0, 0, 0],
            },
        ],
    });

    useEffect(() => {
        const newData = {
            labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
            datasets: [
                {
                    label: 'Turnos',
                    data: [
                        pacientesAtendidosPorDia('Lunes'),
                        pacientesAtendidosPorDia('Martes'),
                        pacientesAtendidosPorDia('Miércoles'),
                        pacientesAtendidosPorDia('Jueves'),
                        pacientesAtendidosPorDia('Viernes'),
                    ],
                },
            ],
        };
        setData(newData);
    }, [turnosSemana]);


    return (
        <div className="containerDashboard">
            <div className='titleDashboard'>
                <p>Dashboard</p>
            </div>
            <div className='containerWelcomeDashboard'>
                <div className='welcomeDashboard'>
                    <div>
                        <b>Bienvenido,</b>
                        <p>Christian Fabián Núñez Coso</p>
                    </div>
                    <div>
                        <img src="https://stg.fundacionsantafedebogota.com/sites/default/files/styles/large/public/2022-10/dr-home.png?itok=j0px4kRI" alt="" />

                    </div>
                </div>
                <div className='stats'>
                    <div className='containerIconsDashboardStats'>
                        <FaUsers className='iconsDashboardStats' />
                    </div>
                    <div className='statsInfo'>
                        <p className='titleStat'>Pacientes</p>
                        <p className='stat'>1</p>
                    </div>
                </div>
                <div className='stats'>
                    <div className='containerIconsDashboardStats'>
                        <IoCalendarNumberSharp className='iconsDashboardStats' />
                    </div>
                    <div className='statsInfo'>
                        <p className='titleStat'>Turnos</p>
                        <p className='stat'>1</p>
                    </div>
                </div>
            </div>
            <div className='containerChart'>
                <p>Turnos de la semana</p>
                {<Bar data={data} className='barChart' />}
            </div>
        </div>
    )
}

export default Dashboard