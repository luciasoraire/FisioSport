import React, { useEffect, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { useDispatch, useSelector } from "react-redux"
import { filterByDNIOrEmail } from '../../Redux/Actions/Actions';

const Patients = () => {

    const dispatch = useDispatch()

    const patients = useSelector(state => state.patients)

    const columns = React.useMemo(
        () => [
            {
                Header: 'DNI',
                accessor: 'dni', // Reemplaza con el nombre correcto de tu propiedad DNI
            },
            {
                Header: 'Nombre',
                accessor: 'name', // Reemplaza con el nombre correcto de tu propiedad Nombre
            },
            {
                Header: 'Apellido',
                accessor: 'lastname', // Reemplaza con el nombre correcto de tu propiedad Apellido
            },
            {
                Header: 'Email',
                accessor: 'email', // Reemplaza con el nombre correcto de tu propiedad Email
            },
            {
                Header: 'Teléfono',
                accessor: 'phone', // Reemplaza con el nombre correcto de tu propiedad Teléfono
            },
            {
                Header: 'Historial Médico',
                accessor: 'historial_medico', // Reemplaza con el nombre correcto de tu propiedad Historial Médico
            },
            // Puedes agregar más columnas según tus necesidades
        ],
        []
    );

    const data = React.useMemo(() => patients, [patients]);

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
    } = useTable({ columns, data, initialState: { pageIndex: 0, pageSize: 20 } }, usePagination);

    const handleFilterChange = (e) => {      
        console.log(e.target.name);
        dispatch(filterByDNIOrEmail({stateName: 'patients', stateNameToFilter: 'patientsToFilter', propertyName:e.target.name, value: e.target.value}))
    }

    return (
        <div>
            <input type="text" name='dni' onChange={handleFilterChange} placeholder='DNI' />
            <input type="text" name='email' onChange={handleFilterChange} placeholder='EMAIL' />
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
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div>
                <span>
                    Página{' '}
                    <strong>
                        {pageIndex + 1} de {pageOptions.length}
                    </strong>{' '}
                </span>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Anterior
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Siguiente
                </button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>
            </div>
        </div>
    )
}

export default Patients