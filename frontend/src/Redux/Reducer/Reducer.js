import { CLOSE_SESION, DELETE_APPOINTMENT, DELETE_PATIENT_INFO, FILTER_BY_DNI_OR_EMAIL, GET_ALL_APPOINTMENTS, GET_ALL_MEDICAL_HISTORIES, GET_ALL_PATIENTS, GET_PATIENT_INFO, SAVE_PATIENT_INFO, SET_ORDER, UPDATE_APPOINTMENT, UPDATE_PATIENT_INFO, USER_AUTH } from "../Actions/Actions"

const initialState = {
    patients: [],
    medicalHistory: [],
    appointments: [],
    userAuth: {
        authenticated: false,
        isAdmin: false,
        email: null
    },
    patientInfo: {},
    // estados para los filtros
    filters: {
        patientsToFilter: [],
        medicalHistoryToFilter: [],
        appointmentsToFilter: []
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_AUTH: {
            console.log(action.payload);
            return {
                ...state,
                userAuth: action.payload
            }
        }
        case CLOSE_SESION: {
            return {
                userAuth: {
                    authenticated: false,
                    isAdmin: false,
                    email: null
                }
            }
        }
        case GET_ALL_PATIENTS: {

            return {
                ...state,
                patients: action.payload,
                filters: {
                    ...state.filters,
                    patientsToFilter: action.payload
                }
            }
        }
        case GET_ALL_APPOINTMENTS: {
            return {
                ...state,
                appointments: action.payload,
                filters: {
                    ...state.filters,
                    appointmentsToFilter: action.payload
                }
            }
        }
        case GET_ALL_MEDICAL_HISTORIES: {
            return {
                ...state,
                medicalHistory: action.payload,
                filters: {
                    ...state.filters,
                    medicalHistoryToFilter: action.payload
                }
            }
        }

        case SAVE_PATIENT_INFO: {
            return {
                ...state,
                patientInfo: action.payload
            }
        }

        case GET_PATIENT_INFO: {

            return {
                ...state,
                patientInfo: action.payload
            }
        }
        case UPDATE_PATIENT_INFO: {
            const { id_patient } = action.payload;
            if (state.patientInfo.id_patient) {
                return { ...state, patientInfo: action.payload }
            }
            else {
                return {
                    ...state,
                    patients: state.patients.map(patient =>
                        patient.id_patient === id_patient ? action.payload : patient
                    )
                }
            }
        }
        case DELETE_PATIENT_INFO: {
            return {
                patients: state.patients.filter(patient => patient.id_patient !== action.payload),
                appointments: state.appointments.filter(appointment => appointment.id_patient !== action.payload)
            }
        }
        case DELETE_APPOINTMENT: {
            return {
                appointments: state.appointments.filter(appointment => appointment.id_appointment !== action.payload)
            }
        }
        case UPDATE_APPOINTMENT: {
            const { id_appointment } = action.payload;

            return {
                ...state,
                appointments: state.appointments.map(appointment =>
                    appointment.id_appointment === id_appointment ? action.payload : appointment
                )
            }
        }

        case FILTER_BY_DNI_OR_EMAIL: {
            const { stateName, stateNameToFilter, propertyName, value } = action.payload;

            const filteredData = [...state.filters[stateNameToFilter]].filter(element => {
                if (element[[propertyName]]) {
                    return element[propertyName].toLowerCase().includes(value.toLowerCase())
                }
                else {
                    return element.Patient[propertyName].toLowerCase().includes(value.toLowerCase())
                }
            });
            return {
                ...state,
                [stateName]: filteredData
            }
        }

        case SET_ORDER: {
            let appointmentsFiltered = [...state.appointments]
            console.log(action.payload);
            if (action.payload.status !== '') {
                if (action.payload.status === 'activo') appointmentsFiltered = [...state.filters.appointmentsToFilter].filter(appointment => appointment.active === true)
                else if (action.payload.status === 'inactivo') appointmentsFiltered = [...state.filters.appointmentsToFilter].filter(appointment => appointment.active === false)
                else appointmentsFiltered = [...state.filters.appointmentsToFilter]
            }
            if (action.payload.date !== '') {
                const formatToYYYYMMDD = (originalDate) => {

                    const [day, month, year] = originalDate.split('/');
                    return new Date(`${year}/${month}/${day}`);
                };

                appointmentsFiltered = [...appointmentsFiltered].sort((a, b) => {
                    const dateA = formatToYYYYMMDD(a.date);
                    const dateB = formatToYYYYMMDD(b.date);
                    console.log(dateA);
                    if (action.payload.date === 'proximo') {

                        return dateA - dateB;
                    } else if (action.payload.date === 'lejano') {
                        return dateB - dateA;
                    }

                    // Por defecto, mantener el orden actual
                    return 0;
                });

            }
            if (action.payload.hour) {
                appointmentsFiltered = [...appointmentsFiltered].sort((a, b) => {
                    const timeA = a.hour;
                    const timeB = b.hour;

                    if (action.payload.hour === 'proximo') {
                        return timeA.localeCompare(timeB);
                    } else if (action.payload.hour === 'lejano') {
                        return timeB.localeCompare(timeA);
                    }
                    
                    return 0;
                });
            }
            return {
                ...state,
                appointments: appointmentsFiltered
            }
        }
        default: {
            return state
        }
    }
}

export default reducer