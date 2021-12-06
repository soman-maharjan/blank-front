import axios from 'axios'
import React, { useEffect, useState } from 'react';
import DeleteModal from '../modal/DeleteModal';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';

const columns = [
    { id: 'productName', label: 'Product Name', minWidth: 170, align: 'center' },
    {
        id: 'category',
        label: 'Category',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'is_active',
        label: 'Status',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'visibility',
        label: 'Change Visibility',
        minWidth: 130,
        align: 'center',
    },
    {
        id: 'options',
        label: 'Options',
        minWidth: 210,
        align: 'center',
    },
];

export default function ManageProduct(props) {

    const [products, setProducts] = useState([]);
    const [id, setId] = useState("");
    const [open, setOpen] = useState(false)

    const [loading, setLoading] = useState(false);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        setLoading(true)
        axios.get('api/user-product')
            .then(response => setProducts(response.data))
            .catch(error => console.log(error))
            .then(() => setLoading(false))
    }, []);

    const statusHandler = (id) => {
        axios.post(`api/product-status/${id}`)
            .then(response => setProducts(response.data))
            .catch(error => console.log(error))
    }

    const submitHandler = () => {
        axios.delete('/api/product/' + id)
            .then(response => setProducts(products.filter(p => p._id !== id)))
            .catch(error => console.log(error))
    }

    const val = {
        open: open,
        setOpen: setOpen,
        submit: submitHandler,
        message: "Are you sure you want to delete this product? All of the data will be permanently removed. This action cannot be undone.",
        title: "Delete product",
        success: "Delete"
    }

    return (
        <div className="w-11/12">
            <div class="text-sm breadcrumbs mt-3">
                <ul>
                    <li>
                        <a onClick={() => props.changePage({ page: 'dashboard' })}>Dashboard</a>
                    </li>
                    <li>Products</li>
                </ul>
            </div>
            {/* <h1 className="text-2xl mb-10">Manage Products</h1> */}
            <div class="navbar shadow mt-3 mb-5 bg-white">
                <div class="flex-1 px-2 mx-2">
                    <span class="text-lg font-semibold">
                        Products
                    </span>
                </div>

                <div class="flex-none">
                    <button class="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
                <div class="flex-none hidden px-2 mx-2 lg:flex">
                    <div class="flex items-stretch">
                        <a className="btn btn-ghost btn-sm rounded-btn bg-green-300" onClick={() => props.changePage({ page: 'add-product' })}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Product
                        </a>
                    </div>
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
                            {products
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                var value = row[column.id];

                                                if (column.id == 'is_active') {
                                                    var value = (row['is_active'] ?
                                                        <span className="p-2 px-6 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            Active
                                                        </span> :
                                                        <span className="p-2 px-4 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                            Not Active
                                                        </span>)
                                                }

                                                if (column.id == 'options') {
                                                    var value =
                                                        <>
                                                            {/* <a onClick={() => props.changePage(row, 'edit-product')} className="normal-case mr-2 min-h-0 h-9 w-16 btn btn-ghost btn-sm rounded-btn bg-indigo-500 hover:bg-indigo-600 text-white">
                                                                Edit
                                                            </a> */}
                                                            <a onClick={() => props.changePage({ page: 'view-product', product: row })} className="normal-case mr-2 min-h-0 h-9 w-16 btn btn-ghost btn-sm rounded-btn bg-blue-500 hover:bg-blue-600 text-white">
                                                                View
                                                            </a>
                                                            <a onClick={() => { setId(row._id); setOpen(true); }} className="normal-case min-h-0 h-9 w-16 btn btn-ghost btn-sm rounded-btn bg-red-500 hover:bg-red-600 text-white">
                                                                Delete
                                                            </a>
                                                        </>
                                                }

                                                if (column.id == 'visibility') {
                                                    var value = <input onChange={() => statusHandler(row._id)} type="checkbox" checked={row['is_active'] ? "checked" : ""} class="toggle toggle-accent" />
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
                    count={products.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <DeleteModal {...val} />
        </div>
    )
}


