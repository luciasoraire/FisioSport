import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import Swal from 'sweetalert2'

const ReserveAppointment = (props) => {

    const [data, setData] = useState({
        dni: '',
        name: '',
        surname: '',
        email: '',
        phone: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const reserveAppointment = async () => {
        const response = await axios.post('http://localhost:3001/fisiosport/appointment', {
            date: props.appointment.date,
            hour: props.appointment.hour,
            dni: data.dni,
            name: data.name,
            surname: data.surname,
            email: data.email,
            phone: data.phone,
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


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="custom-modal"
        >
            <Modal.Header closeButton >
                <Modal.Title id="contained-modal-title-vcenter" className='containerHeaderModal'>
                    Crear Nuevo Paciente
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='containerBodyEditPatient'>
                <div>
                    <h2>Informacion Personal</h2>
                    <div>
                        <div>
                            <label>Nombre</label>
                            <input type="text" name='name' value={data?.name} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Apellido</label>
                            <input type="text" name='surname' onChange={handleChange} value={data.surname} />
                        </div>
                        <div>
                            <label>DNI</label>
                            <input type="text" name='dni' onChange={handleChange} value={data.dni} />
                        </div>
                        <div>
                            <label>Email</label>
                            <input type="text" name='email' onChange={handleChange} value={data.email} />
                        </div>
                        <div>
                            <label>Celular</label>
                            <input type="text" name='phone' onChange={handleChange} value={data.phone} />
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className='containerFooterModal'>
                <Button onClick={props.onHide}>Cerrar</Button>
                <Button onClick={reserveAppointment}>Reservar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ReserveAppointment