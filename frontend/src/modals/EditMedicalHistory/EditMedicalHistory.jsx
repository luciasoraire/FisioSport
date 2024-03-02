import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './EditMedicalHistory.css'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { FaUserCircle } from "react-icons/fa";
import Swal from 'sweetalert2'

const EditMedicalHistory = (props) => {

    const [patient, setPatient] = useState({
        diagnostic: '',
        socialWelfare: '',
        medicationAllergies: '',
        currentMedications: '',
        previusInjuries: '',
        currentSymptoms: '',
        notes: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            if (props?.patient) {
                try {
                    const response = await axios.get(`http://localhost:3001/fisiosport/history/${props?.patient?.id_patient}`);
                    setPatient(response.data[0]);
                } catch (error) {
                    console.error('Error fetching medical history:', error);
                }
            }
        };

        fetchData();
    }, [props.patient && props.patient.id_patient]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient((prevPatient) => ({
            ...prevPatient,
            [name]: value,
        }));

        e.target.style.height = 'auto';
        e.target.style.height = Math.max(e.target.scrollHeight, 40) + 'px';
    };

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
                axios.post('http://localhost:3001/fisiosport/history', { ...patient, id_patient: props.patient.id_patient })
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


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className='containerHeaderModal'>
                    Historial Clínico
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div className='containerInfoPatientMedicalHistory'>
                    <div className='containerPatientName'>
                        <p><FaUserCircle className='iconPatientName' />{props?.patient?.name + ' ' + props?.patient?.lastname}</p>
                    </div>
                    <div className='containerPatientContact'>
                        <p><b>Email: </b> {props?.patient?.email}</p>
                        <p><b>Telefono: </b>{props?.patient?.phone}</p>
                        <p><b>Edad: </b>{props?.patient?.age}</p>
                        <p><b>DNI: </b> {props?.patient?.dni}</p>
                    </div>
                </div>
                <hr />
                <div className='containerMedicalHistory'>
                    <div>
                        <label htmlFor="diagnostic">Diagnostico:</label>
                        <textarea
                            type="text"
                            id="diagnostic"
                            name="diagnostic"
                            value={patient?.diagnostic}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="socialWelfare">Obra Social:</label>
                        <input
                            type="text"
                            id="socialWelfare"
                            name="socialWelfare"
                            value={patient?.socialWelfare}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="medicationAllergies">Alergias a Medicamentos:</label>
                        <textarea
                            type="text"
                            id="medicationAllergies"
                            name="medicationAllergies"
                            value={patient?.medicationAllergies}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="currentMedications">Medicamentos Actuales:</label>
                        <textarea
                            type="text"
                            id="currentMedications"
                            name="currentMedications"
                            value={patient?.currentMedications}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="previusInjuries">Lesiones Previas:</label>
                        <textarea
                            type="text"
                            id="previusInjuries"
                            name="previusInjuries"
                            value={patient?.previusInjuries}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="currentSymptoms">Sintomas Actuales:</label>
                        <textarea
                            type="text"
                            id="currentSymptoms"
                            name="currentSymptoms"
                            value={patient?.currentSymptoms}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="notes">Notas:</label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={patient?.notes}
                            onChange={handleChange}
                        />
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

export default EditMedicalHistory