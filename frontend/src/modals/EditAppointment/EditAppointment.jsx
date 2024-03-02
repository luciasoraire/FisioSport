import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { updateAppointment, updatePatientInfo } from '../../Redux/Actions/Actions';
import Calendar from 'react-calendar';
import './EditAppointment.css'
import Swal from 'sweetalert2'

const EditAppointment = (props) => {

    const dispatch = useDispatch()

    // FORMATEAR LA FECHA YA EXISTENTE DEL TURNO
    useEffect(() => {
        const { date: appointmentDate } = props?.appointment || {};
        if (appointmentDate) {
            const [day, month, year] = appointmentDate.split("/");
            const initialDate = new Date(year, month - 1, day);
            setDate(initialDate);
        }
    }, [props.appointment]);

    // ESTADOS
    const [date, setDate] = useState(null);
    const [hour, setHour] = useState('')
    const [disponibility, setDisponibility] = useState([])

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

    // GUARDAR LOS CAMBIOS HECHOS EN EL TURNO
    const saveChanges = async () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "¿Estas seguro?",
            text: "Esta acción no se puede deshacer!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, guardar!",
            cancelButtonText: "No, cancelar!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Guardado!",
                    text: "Los cambios fueron guardados.",
                    icon: "success"
                });
                dispatch(updateAppointment(props.appointment.id_appointment, { date, hour }))
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "Los cambios no se guardaron.",
                    icon: "error"
                });

            }
        })

    }

    // CANCELAR LOS CAMBIOS QUE SE YA SE HABIAN SELECCIONADO
    const cancelAppointment = () => {
        setDate(null)
        setHour('')
        setDisponibility([])
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className='containerHeaderModal'>
                    Editar Turno
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='containerBodyEditPatient'>
                <div>
                    <h2 className='titleModal'>{`Editando el turno de: ${props?.appointment?.Patient?.name + ' ' + props?.appointment?.Patient?.lastname}`}</h2>
                </div>
                <div>
                    <div className='containerInfoAppointmentPatient'>
                        <div>
                            <label htmlFor="nombre">Paciente:</label>
                            <p>{props?.appointment?.Patient?.name + ' ' + props?.appointment?.Patient?.lastname}</p>
                        </div>

                        <div>
                            <label htmlFor="dni">DNI:</label>
                            <p>{props?.appointment?.Patient?.dni}</p>
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <p>{props?.appointment?.Patient?.email}</p>
                        </div>
                        <div>
                            <label htmlFor="email">Telefono:</label>
                            <p>{props?.appointment?.Patient?.phone}</p>
                        </div>
                    </div>
                    <div className='containerModalCalendar'>

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
                        <div className='infoAppointmentModal'>
                            <p><b>Fecha: </b>{date ? date.toLocaleDateString() : props?.appointment?.date}</p>
                            <p><b>Hora: </b>{hour ? hour : props?.appointment?.hour}</p>
                            <button onClick={cancelAppointment}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cerrar</Button>
                <Button onClick={saveChanges}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditAppointment