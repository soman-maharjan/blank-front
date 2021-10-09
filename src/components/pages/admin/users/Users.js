import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import Modal from '../../modal/Modal';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';

const columns = [
    { id: '_id', label: 'User Id', minWidth: 170, align: 'center' },
    { id: 'name', label: 'Name', minWidth: 170, align: 'center' },
    {
        id: 'email',
        label: 'Email',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'bio',
        label: 'Bio',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'options',
        label: 'Options',
        minWidth: 170,
        align: 'center',
    },
];

export default function ShowUsers(props) {

    const [users, setUsers] = useState([]);
    const [id, setId] = useState("");

    const [open, setOpen] = useState(false)

    useEffect(() => {
        axios.get('/api/users')
            .then(response => setUsers(response.data))
            .catch(error => console.log(error.response))
    }, [])

    const submitHandler = () => {
        axios.delete('/api/users/' + id)
            .then(response => setUsers(users.filter(u => u._id !== id)))
            .catch(error => console.log(error))
    }

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };



    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const val = {
        open: open,
        setOpen: setOpen,
        submit: submitHandler,
        message: "Are you sure you want to delete this account? All of the data will be permanently removed. This action cannot be undone.",
        title: "Delete account",
        success: "Delete"
    }

    return (
        <div className="w-11/12">
            <div class="text-sm breadcrumbs mt-3">
                <ul>
                    <li>
                        <a onClick={() => props.changePage({ page: 'dashboard' })}>Dashboard</a>
                    </li>
                    <li>Users</li>
                </ul>
            </div>
            {/* <h1 className="text-2xl mb-10">Manage Products</h1> */}
            <div class="navbar shadow mt-3 mb-5">
                <div class="flex-1 px-2 mx-2">
                    <span class="text-lg font-semibold">
                        Users
                    </span>
                </div>

                <div class="flex-none">
                    <button class="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </div>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ minHeight: '75vh' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                var value = row[column.id];

                                                if (column.id == 'options') {
                                                    var value =
                                                        <>
                                                            <a onClick={() => props.changePage({ page: 'edit-user', user: row })} className="normal-case mr-2 min-h-0 h-9 w-16 btn btn-ghost btn-sm rounded-btn bg-blue-500 hover:bg-blue-600 text-white">
                                                                Edit
                                                            </a>
                                                            <a onClick={() => { setId(row._id); setOpen(true); }} className="normal-case min-h-0 h-9 w-16 btn btn-ghost btn-sm rounded-btn bg-red-500 hover:bg-red-600 text-white">
                                                                Delete
                                                            </a>
                                                        </>
                                                }
                                                return (
                                                    <TableCell key={column.id} align={column.align} className="payment-table">
                                                        {value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Modal {...val} />
        </div>
    )
}
