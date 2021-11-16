import axios from 'axios'
import React, { Component } from 'react'
import Moment from 'react-moment';
import Fuse from 'fuse.js'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';

const columns = [
    { id: '_id', label: 'Order Id', minWidth: 230, align: 'center' },
    { id: 'created_at', label: 'Order Date', minWidth: 170, align: 'center' },
    {
        id: 'pending',
        label: 'Pending Since',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 140,
        align: 'center',
    },
    {
        id: 'options',
        label: 'Options',
        minWidth: 140,
        align: 'center',
    },
];

var fuse;

class ShowOrder extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orders: [],
            filteredData: [],
            search: "",
            page: 0,
            rowsPerPage: 10
        }
    }
    
    flattenObj(obj, parent, res = {}) {
        for (let key in obj) {
            let propName = parent ? parent + '.' + key : key;
            if (typeof obj[key] == 'object') {
                this.flattenObj(obj[key], propName, res);
            } else {
                res[propName] = obj[key];
            }
        }
        return res;
    }

    initializeFuse = () => {
        if (this.state.orders != []) {
            const options = {
                includeScore: true,
                keys: Object.keys(this.flattenObj(this.state.orders[0]))
            }

            fuse = new Fuse(this.state.orders, options)
        }
    }

    componentDidMount() {
        axios.get('/api/user-order')
            .then(response => {
                console.log(response)
                this.setState({ ...this.state, filteredData: response.data, orders: response.data }, (this.initializeFuse))
            })
            .catch(error => console.log(error.response))

    }

    searchHandler = (event) => {
        if (event.target.value != "") {
            this.setState({ ...this.state, search: event.target.value, filteredData: fuse.search(event.target.value).map(o => o.item) })
        } else {
            this.setState({ ...this.state, search: event.target.value, filteredData: this.state.orders })
        }
    }

    handleChangePage = (event, newPage) => {
        this.setState({ ...this.state, page: newPage });
    };



    handleChangeRowsPerPage = (event) => {
        this.setState({ ...this.state, rowsPerPage: +event.target.value, page: 0 });
    };

    render() {
        return (
            <div className="w-11/12">
                <div class="text-sm breadcrumbs mt-3">
                    <ul>
                        <li>
                            <a onClick={() => this.props.changePage({}, 'dashboard')}>Dashboard</a>
                        </li>
                        <li>Orders</li>
                    </ul>
                </div>
                <div class="navbar shadow mt-3 mb-5 bg-white">
                    <div class="flex-1 px-2 mx-2">
                        <span class="text-lg font-semibold">
                            Orders
                        </span>
                    </div>

                    <div class="flex-none">
                        <input type="text" name="search" className="px-2 w-40 min-h-0 h-7 bg-gray-50 text-gray-700 border outline-none focus:border-indigo-500" value={this.state.search} onChange={(event) => this.searchHandler(event)} />
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
                                {this.state.orders.length < 1 ?
                                    <TableRow hover className="text-center justify-center items-center" >
                                        <TableCell colSpan="5" className="payment-table text-center justify-center">
                                            <div className="text-center">No data available in table</div>
                                        </TableCell>
                                    </TableRow>
                                    :
                                    null
                                }
                                {this.state.filteredData
                                    .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    var value = row[column.id];

                                                    if (column.id == '_id') {
                                                        var value = <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <img className="h-10 w-10 rounded-full" src={`${process.env.REACT_APP_IMAGE_URL}${row['sku'].images[0]}`} alt="" />
                                                            </div>
                                                            <div className="ml-4 whitespace-normal">
                                                                <div className="text-sm break-all font-medium text-gray-900">{row['order_id']}</div>
                                                            </div>
                                                        </div>
                                                    }

                                                    if (column.id == 'created_at') {
                                                        var value = <Moment format="YYYY/MM/DD">{row['created_at']}</Moment>
                                                    }

                                                    if (column.id == 'pending') {
                                                        var value = (row['status'] == "pending" ? <Moment fromNow>{row['created_at']}</Moment> : "-")
                                                    }

                                                    if (column.id == 'status') {
                                                        var value = <span className="capitalize">{row['status']}</span>
                                                    }

                                                    if (column.id == 'options') {
                                                        var value =
                                                            <>
                                                                <a onClick={() => this.props.changePage({ page: 'view-order', order: row })} className="normal-case mr-2 min-h-0 h-9 w-16 btn btn-ghost btn-sm rounded-btn bg-blue-500 hover:bg-blue-600 text-white">
                                                                    View
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
                        count={this.state.filteredData.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        onPageChange={this.handleChangePage}
                        onRowsPerPageChange={this.handleChangeRowsPerPage}
                    />
                </Paper>
            </div >
        )
    }
}

export default ShowOrder
