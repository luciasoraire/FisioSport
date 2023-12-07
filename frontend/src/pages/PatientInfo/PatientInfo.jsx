import { useEffect, useState } from 'react';
import './PatientInfo.css'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { savePatientInfo, updatePatientInfo } from '../../Redux/Actions/Actions';
import Swal from 'sweetalert2'
const PatientInfo = () => {
    const dispatch = useDispatch();

    const patientInfo = useSelector((state) => state.patientInfo);
    const userAuth = useSelector(state => state.userAuth)
    useEffect(() => {
        setFormData({
            name: patientInfo?.name,
            lastname: patientInfo?.lastname,
            phone: patientInfo?.phone,
            dni: patientInfo?.dni,
            email: userAuth?.email,
            age: patientInfo?.age
        })
    }, [patientInfo])


    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        phone: '',
        dni: '',
        email: userAuth?.email,
        age: ''
    });
    const [edit, setEdit] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(
            'http://localhost:3001/fisiosport/patient',
            formData
        );

        if(response.data.message)
        {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.data.message,
              })
        }
        else
        {
            Swal.fire({
                title: "Informacion cargada!",
                text: "Gracias!",
                icon: "success"
            });
            dispatch(savePatientInfo(response.data));
        }
    };

    const updatePatient = () => {
        dispatch(updatePatientInfo(patientInfo?.id_patient, formData))
    }

    return (
        <div className='containerPatientInfo'>
            <div className='textPatientInfo'>
                <h2>Información y Privacidad</h2>
                <div className='containerInfo'>
                    <ul>
                        <li>
                            <p>Para poder reservar turnos, es necesario completar todos los campos de información personal.
                            Asegúrate de proporcionar información precisa y actualizada.</p>
                        </li>
                        <li>
                            <p>La información personal que proporcionas será tratada de manera confidencial y se utilizará únicamente con el propósito de brindarte un servicio personalizado. Nos comprometemos a proteger tu privacidad y a cumplir con las regulaciones de seguridad de datos.</p>

                        </li>
                        <li>
                            <p>Recuerda que tus datos personales son flexibles. Puedes actualizar tu información en cualquier momento accediendo a tu cuenta y visitando la sección de "Mis Datos". Si necesitas ajustar la fecha, hora u otra información personal, estamos aquí para facilitar ese proceso. Tu comodidad es nuestra prioridad.</p>

                        </li>
                    </ul>


                </div>
            </div>
            <div className='containerFormPatientInfo'>
                <div className='formPatientInfo'>
                    {!patientInfo?.email ? (
                        <form onSubmit={handleSubmit} className='formInfo'>
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
                            
                            <div className='containerButtonSubmit'>
                                <button type="submit">Guardar</button>
                            </div>
                        </form>
                    ) : (
                        <div className='containerInfoPatient'>
                            
                            <p className='titleInfoPatient'>Informacion Personal</p>
                                {
                                    !edit ? (
                                        <div className='patientInfoLoged'>
                                            <p><b>Nombre: </b>{patientInfo?.name}</p>
                                            <p><b>Apellido: </b>{patientInfo?.lastname}</p>
                                            <p><b>Edad: </b>{patientInfo?.age}</p>
                                            <p><b>Telefono: </b>{patientInfo?.phone}</p>
                                            <p><b>DNI: </b>{patientInfo?.dni}</p>
                                            <p><b>Email: </b>{patientInfo?.email}</p>
                                        </div>
                                    )
                                        : (
                                            <div className='labelsAndInputsLoged'>
                                                <input type='text' name='name' value={formData?.name} onChange={handleChange} />
                                                <input type='text' name='lastname' value={formData?.lastname} onChange={handleChange} />
                                                <input type='text' name='age' value={formData?.age} onChange={handleChange} />
                                                <input type='text' name='phone' value={formData?.phone} onChange={handleChange} />
                                                <input type='text' name='dni' value={formData?.dni} onChange={handleChange} />
                                                {/*<input type='text' name='email' value={formData.email} onChange={handleChange}/>*/}
                                                <div className='containerButtonSubmit'>

                                                <button onClick={updatePatient}>Guardar</button>
                                                </div>
                                            </div>
                                        )
                                }
                            
                            <button className='buttonEditOrCancel' onClick={() => setEdit(!edit)}>{edit ? 'Cancelar' : 'Editar'}</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientInfo;