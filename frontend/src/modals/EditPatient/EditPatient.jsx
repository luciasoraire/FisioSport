import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { updatePatientInfo } from '../../Redux/Actions/Actions';
import './EditPatient.css'

const EditPatient = (props) => {

    const dispatch = useDispatch()

    const [patient, setPatient] = useState({})
    
    const handleChange = (e) => {
        setPatient({
            ...patient,
            [e.target.name]: e.target.value
        })
    }

    const saveChanges = async () => {
        dispatch(updatePatientInfo(props.patient.id_patient, patient))
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
                    Editar Paciente
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='containerBodyEditPatient'>
                <div>
                    <h2 className='titleModal'>{`Editando a ${props?.patient?.name + ' ' + props?.patient?.lastname}`}</h2>
                </div>
                <div className='containerInputsModal'>
                    <div className='inputsAndLabesModal'>
                        <label htmlFor="dni">DNI:</label>
                        <input type="text" id="dni" name='dni' defaultValue={props?.patient?.dni} onChange={handleChange} />
                    </div>
                    <div className='inputsAndLabesModal'>
                        <label htmlFor="nombre">Nombre:</label>
                        <input type="text" id="nombre" name='name' defaultValue={props?.patient?.name} onChange={handleChange} />
                    </div>
                    <div className='inputsAndLabesModal'>
                        <label htmlFor="apellido">Apellido:</label>
                        <input type="text" id="apellido" name='lastname' defaultValue={props?.patient?.lastname} onChange={handleChange} />
                    </div>
                    <div className='inputsAndLabesModal'>
                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" name='email' defaultValue={props?.patient?.email} onChange={handleChange} />
                    </div>
                    <div className='inputsAndLabesModal'>
                        <label htmlFor="telefono">Teléfono:</label>
                        <input type="text" id="telefono" name='phone' defaultValue={props?.patient?.phone} onChange={handleChange} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className='containerFooterModal'>
                <Button onClick={props.onHide}>Cerrar</Button>
                <Button onClick={saveChanges}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditPatient