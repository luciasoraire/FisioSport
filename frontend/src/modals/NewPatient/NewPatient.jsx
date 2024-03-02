import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { savePatientInfo } from '../../Redux/Actions/Actions';
import './NewPatient.css'
import Swal from 'sweetalert2'

const NewPatient = (props) => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        phone: '',
        dni: '',
        email: '',
        age: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        const response = await axios.post(
            'http://localhost:3001/fisiosport/patient',
            formData
        );

        if (response.data.message) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.data.message,
            })
        }
        else {
            Swal.fire({
                title: "Informacion cargada!",
                text: "Gracias!",
                icon: "success"
            });
            dispatch(savePatientInfo(response.data));
        }
    };


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
                    <p>Informacion Personal</p>
                    <div className='labelsAndInputs'>
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData?.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='labelsAndInputs'>
                        <label htmlFor="lastname">Apellido</label>
                        <input
                            type="text"
                            name="lastname"
                            id="lastname"
                            value={formData?.lastname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='labelsAndInputs'>
                        <label htmlFor="age">Edad</label>
                        <input
                            type="number"
                            name="age"
                            id="age"
                            value={formData?.age}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='labelsAndInputs'>
                        <label htmlFor="phone">Email</label>
                        <input
                            type="text"
                            name="email"
                            id="phone"
                            value={formData?.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='labelsAndInputs'>
                        <label htmlFor="phone">Teléfono</label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            value={formData?.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='labelsAndInputs'>
                        <label htmlFor="dni">DNI</label>
                        <input
                            type="text"
                            name="dni"
                            id="dni"
                            value={formData?.dni}
                            onChange={handleChange}
                        />
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer className='containerFooterModal'>
                <Button onClick={props.onHide}>Cerrar</Button>
                <Button onClick={handleSubmit}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default NewPatient