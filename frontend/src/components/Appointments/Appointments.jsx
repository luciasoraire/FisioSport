import './Appointments.css'
import React, { useEffect, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { useDispatch, useSelector } from "react-redux"
import { deleteAppointment, filterByDNIOrEmail, setOrder } from '../../Redux/Actions/Actions';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import EditAppointment from '../../modals/EditAppointment/EditAppointment';
import { IoMdCloseCircle } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2'
import TextField from '@mui/material/TextField';


const Appointments = () => {
    const dispatch = useDispatch()

    const [orderBy, setOrderBy] = useState({
        status: '',
        date: '',
        hour: ''
    });

    const handleChange = (event) => {
        setOrderBy({
            ...orderBy,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        dispatch(setOrder(orderBy))
    }, [orderBy])

    const appointments = useSelector(state => state.appointments)

    const [modalEditAppointmentShow, setModalEditAppointmentShow] = useState(false);

    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const handleEditClick = (appointment, column) => {
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
                Header: 'DNI',
                accessor: 'dni',
            },
            {
                Header: 'Nombre',
                accessor: 'name',
            },
            {
                Header: 'Apellido',
                accessor: 'surname',
            },
            {
                Header: 'Email',
                accessor: 'email',
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
                Header: 'Estado',
                accessor: 'active',
                Cell: ({ value }) => (
                    value
                        ? <p className='statusActive'>Activo</p>
                        : <p className='statusInactive'>Inactivo</p>
                ),
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
        dispatch(filterByDNIOrEmail({ stateName: 'appointments', stateNameToFilter: 'appointmentsToFilter', propertyName: e.target.name, value: e.target.value }))
    }

    return (
        <div className='containerPatients'>
            <div className='titlePatients'>
                <p>Turnos</p>
            </div>
            <div className='containerFilterAppointment'>
                <div className='containerInputsAppointment'>
                    <TextField id="outlined-basic" name='dni' label="DNI" variant="outlined" onChange={handleFilterChange} />
                    <TextField id="outlined-basic" name='email' label="Email" variant="outlined" onChange={handleFilterChange} />
                    <TextField id="outlined-basic" name='date' label="Fecha" variant="outlined" onChange={handleFilterChange} />
                </div>
                <div className='containerDropAppointment'>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label" >Estado</InputLabel>
                            <Select
                                sx={{ height: 50 }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={orderBy.status}
                                label="Estado"
                                name='status'
                                onChange={handleChange}
                            >
                                <MenuItem value='todos'>Todos</MenuItem>
                                <MenuItem value='activo'>Activo</MenuItem>
                                <MenuItem value='inactivo'>Inactivo</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Fecha</InputLabel>
                            <Select
                                sx={{ height: 50 }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={orderBy.date}
                                label="Fecha"
                                name='date'
                                onChange={handleChange}
                            >
                                <MenuItem value='proximo'>Mas proximo</MenuItem>
                                <MenuItem value='lejano'>Mas lejano</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Hora</InputLabel>
                            <Select
                                sx={{ height: 50 }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={orderBy.hour}
                                label="Hora"
                                name='hour'
                                onChange={handleChange}
                            >
                                <MenuItem value='proximo'>Mas proximo</MenuItem>
                                <MenuItem value='lejano'>Mas lejano</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
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