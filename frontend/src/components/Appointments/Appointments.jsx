import './Appointments.css'
import React, { useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { useDispatch, useSelector } from "react-redux"
import { deleteAppointment, filterByDNIOrEmail, orderByDate } from '../../Redux/Actions/Actions';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import EditAppointment from '../../modals/EditAppointment/EditAppointment';
import { IoMdCloseCircle } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";

import Swal from 'sweetalert2'

const Appointments = () => {

    const dispatch = useDispatch()

    const appointments = useSelector(state => state.appointments)

    const [modalEditAppointmentShow, setModalEditAppointmentShow] = useState(false);

    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const handleEditClick = (appointment, column) => {
        console.log(appointment);
        setSelectedAppointment(appointment);
        if (column === 'editAppointment') setModalEditAppointmentShow(true);
        if (column === 'deleteAppointment') {

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
                confirmButtonText: "Si, Eliminar!",
                cancelButtonText: "No, cancelar!",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire({
                        title: "Eliminado!",
                        text: "El turno fue eliminado.",
                        icon: "success"
                    });
                    dispatch(deleteAppointment(appointment.id_appointment))
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire({
                        title: "Cancelado",
                        text: "El turno no se eliminó :)",
                        icon: "error"
                    });
                }
            })

        }

    };

    const columns = React.useMemo(
        () => [
            {
                Header: '#',
                accessor: 'Patient.id_patient',
            },
            {
                Header: 'DNI',
                accessor: 'Patient.dni',
            },
            {
                Header: 'Nombre',
                accessor: 'Patient.name',
            },
            {
                Header: 'Apellido',
                accessor: 'Patient.lastname',
            },
            {
                Header: 'Email',
                accessor: 'Patient.email',
            },
            {
                Header: 'Fecha',
                accessor: 'date',
            },
            {
                Header: 'Hora',
                accessor: 'hour',
            },
            {
                Header: 'Acciones',
                accesor: 'actions',
                Cell: ({ row }) => (
                    <div className='containerButtonsActions'>
                        <button onClick={() => handleEditClick(row.original, 'editAppointment')}><IoIosSettings className='iconActionEdit' /></button>
                        <button onClick={() => handleEditClick(row.original, 'deleteAppointment')}><IoMdCloseCircle className='iconActionDelete' /></button>
                    </div>
                ),
            }

        ],
        []
    );

    const data = React.useMemo(() => appointments, [appointments]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable({ columns, data }, usePagination);

    const handleFilterChange = (e) => {
        console.log(e.target.name);
        dispatch(filterByDNIOrEmail({ stateName: 'appointments', stateNameToFilter: 'appointmentsToFilter', propertyName: e.target.name, value: e.target.value }))
    }

    const [orderAppointment, setOrderAppointment] = useState({
        date: '',
        hour: ''
    })

    const handleOrderChange = (eventKey, orderType) => {

        setOrderAppointment({
            ...orderAppointment,
            [orderType]: eventKey
        })

        const appointmentsToFilter = [...appointments]

        const orderedAppointments = appointmentsToFilter.sort((a, b) => {
            const parseDate = (dateString) => {
                const [day, month, year] = dateString.split('/');
                return new Date(`${year}-${month}-${day}`);
            };

            const parseTime = (timeString) => {
                const [hour, minute] = timeString.split(':');
                return { hour: parseInt(hour), minute: parseInt(minute) };
            };

            const parseDateTime = (dateTimeString) => {
                const [date, time] = dateTimeString.split('T');
                const dateObj = parseDate(date);
                const timeObj = parseTime(time);
                return new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), timeObj.hour, timeObj.minute);
            };

            const dateTimeA = parseDateTime(`${a.date}T${a.hour}`);
            const dateTimeB = parseDateTime(`${b.date}T${b.hour}`);

            if (orderType === 'date') {
                if (eventKey === 'proximo') {
                    return dateTimeA - dateTimeB;
                } else if (eventKey === 'lejano') {
                    return dateTimeB - dateTimeA;
                }
            } else if (orderType === 'hour') {
                const timeDiff = parseTime(a.hour).hour * 60 + parseTime(a.hour).minute - (parseTime(b.hour).hour * 60 + parseTime(b.hour).minute);
                return eventKey === 'proximo' ? timeDiff : -timeDiff;
            }

            return 0;
        });

        dispatch(orderByDate(orderedAppointments));

    }

    return (
        <div className='containerPatients'>
            <div className='titlePatients'>
                <p>Turnos</p>
            </div>
            <div className='containerFilterAppointment'>
                <div className='containerInputsAppointment'>
                    <p>Buscar por: </p>
                    <input type="text" name='dni' onChange={handleFilterChange} placeholder='DNI' />
                    <input type="text" name='email' onChange={handleFilterChange} placeholder='EMAIL' />
                    <input type="text" name='date' onChange={handleFilterChange} placeholder='DATE' />
                </div>
                <div className='containerDropAppointment'>
                    <p>Ordenar por: </p>
                    <DropdownButton id="dropdown-item-button" title="Fecha" onSelect={(eventKey) => handleOrderChange(eventKey, 'date')} className='dropDown'>
                        <Dropdown.Item as="button">Ordenar por</Dropdown.Item>
                        <Dropdown.Item as="button" eventKey='proximo'>Mas proximos</Dropdown.Item>
                        <Dropdown.Item as="button" eventKey='lejano'>Mas lejanos</Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton id="dropdown-item-button" title="Horario" onSelect={(eventKey) => handleOrderChange(eventKey, 'hour')} className='dropDown'>
                        <Dropdown.Item as="button">Ordenar por</Dropdown.Item>
                        <Dropdown.Item as="button" eventKey='proximo'>Mas proximos</Dropdown.Item>
                        <Dropdown.Item as="button" eventKey='lejano'>Mas lejanos</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
            <div className='containerTablePatients'>
                <table {...getTableProps()} className="table">
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr key={row.id} {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td key={cell.column.id} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className='containerOptionsNavigation'>
                    <div className='containerButtonsNavigation'>
                        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className='buttonsArrowsPage'>
                            <MdKeyboardDoubleArrowLeft className='arrowIcon' />
                        </button>
                        <button onClick={() => previousPage()} disabled={!canPreviousPage} className='buttonNavigationPage'>
                            Anterior
                        </button>
                        <button onClick={() => nextPage()} disabled={!canNextPage} className='buttonNavigationPage'>
                            Siguiente
                        </button>
                        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className='buttonsArrowsPage'>
                            <MdKeyboardDoubleArrowRight className='arrowIcon' />
                        </button>
                    </div>
                    <div className='numberOfPage'>
                        <span>
                            Página{' '}
                            <strong>
                                {pageIndex + 1} de {pageOptions.length}
                            </strong>{' '}
                        </span>
                    </div>
                </div>
            </div>
            <EditAppointment
                show={modalEditAppointmentShow}
                onHide={() => setModalEditAppointmentShow(false)}
                appointment={selectedAppointment}
            />
        </div>
    )
}

export default Appointments