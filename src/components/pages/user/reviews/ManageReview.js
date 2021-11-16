import axios from 'axios'
import React, { Component } from 'react'
import Moment from 'react-moment';
import Fuse from 'fuse.js';

import ImageUploading from 'react-images-uploading';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const columns = [
    { id: '_id', label: 'Review Id', minWidth: 230, align: 'center' },
    { id: 'created_at', label: 'Review Date', minWidth: 170, align: 'center' },
    {
        id: 'rating',
        label: 'Rating',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'review',
        label: 'Review',
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

const column2 = [
    { id: '_id', label: 'Order Id', minWidth: 230, align: 'center' },
    { id: 'productName', label: 'Product Name', minWidth: 170, align: 'center' },
    {
        id: 'status',
        label: 'Status',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'created_at',
        label: 'Order Date',
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

export default class ManageOrder extends Component {
    constructor(props) {
        super(props)

        this.state = {
            reviews: [],
            filteredData: [],
            unreviewed: [],
            search: "",
            page: 0,
            rowsPerPage: 10,
            open: false,
            id: "",
            images: "",
            review: ""
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.submitReview = this.submitReview.bind(this);

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
        if (this.state.reviews != []) {
            const options = {
                includeScore: true,
                keys: Object.keys(this.flattenObj(this.state.reviews[0]))
            }

            fuse = new Fuse(this.state.reviews, options)
        }
    }

    submitReview = () => {
        this.setState({ ...this.state, open: false });
        console.log(this.state)
    }

    componentDidMount() {
        // Promise.all([axios.get('/api/review'), axios.get('api/unreviewed')])
        //     .then(function (results) {
        //         console.log(results)
        //         // this.setState({ ...this.state, filteredData: results[0].data, reviews: results[0].data, unreviewed: results[1].data }, (this.initializeFuse))
        //     })
        //     .catch(error => console.log(error.response));

        axios.get('/api/unreviewed')
            .then(response => this.setState({ ...this.state, filteredData: response.data, reviews: response.data, unreviewed: response.data }, (this.initializeFuse)))
            .catch(error => console.log(error.response))
    }

    searchHandler = (event) => {
        if (event.target.value != "") {
            this.setState({ ...this.state, search: event.target.value, filteredData: fuse.search(event.target.value).map(o => o.item) })
        } else {
            this.setState({ ...this.state, search: event.target.value, filteredData: this.state.reviews })
        }
    }

    handleChangePage = (event, newPage) => {
        this.setState({ ...this.state, page: newPage });
    };



    handleChangeRowsPerPage = (event) => {
        this.setState({ ...this.state, rowsPerPage: +event.target.value, page: 0 });
    };

    changeHandler = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div className="w-11/12">
                <div class="text-sm breadcrumbs mt-3">
                    <ul>
                        <li>
                            <a onClick={() => this.props.changePage({}, 'dashboard')}>Dashboard</a>
                        </li>
                        <li>Reviews</li>
                    </ul>
                </div>
                <div class="navbar shadow mt-3 mb-5 bg-white">
                    <div class="flex-1 px-2 mx-2">
                        <span class="text-lg font-semibold">
                            Reviews
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
                    <TableContainer sx={{ minHeight: '50vh' }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {column2.map((column) => (
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
                                {this.state.reviews.length < 1 ?
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
                                                {column2.map((column) => {
                                                    var value = row[column.id];
                                                    if (column.id == 'created_at') {
                                                        var value = <Moment format="YYYY/MM/DD">{row['created_at']}</Moment>
                                                    }
                                                    if (column.id == 'status') {
                                                        var value = <span className="capitalize">{row[column.id]}</span>
                                                    }
                                                    if (column.id == 'options') {
                                                        var value =
                                                            // row['status'] == 'delivered' ?
                                                            <>
                                                                <a onClick={() => this.setState({ ...this.state, id: row['_id'], open: true })} className="normal-case mr-2 min-h-0 h-9  btn btn-ghost btn-sm rounded-btn bg-green-400 hover:bg-green-500 text-white">
                                                                    Leave a Review
                                                                </a>
                                                            </>
                                                        // : null
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
                <br />
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ minHeight: '50vh' }}>
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
                                {this.state.reviews.length < 1 ?
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
                                                    if (column.id == 'options') {
                                                        var value =
                                                            <>
                                                                <a onClick={() => this.props.changePage({ page: 'view-order', order: row })} className="normal-case mr-2 min-h-0 h-9 w-16 btn btn-ghost btn-sm rounded-btn bg-blue-400 hover:bg-blue-500 text-white">
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


                <Transition appear show={this.state.open} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-10 overflow-y-auto"
                        onClose={() => this.setState({ ...this.state, open: false })}
                    >
                        <div className="min-h-screen px-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0" />
                            </Transition.Child>

                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span
                                className="inline-block h-screen align-middle"
                                aria-hidden="true"
                            >
                                &#8203;
                            </span>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Leave a Review
                                    </Dialog.Title>
                                    <div className="mt-4">
                                        <textarea className="textarea textarea-bordered" cols="100" rows="10" name="review" onChange={this.changeHandler} value={this.state.review}></textarea>
                                    </div>

                                    <div className="mt-4">
                                        <ImageUploading
                                            multiple
                                            value={this.state.images}
                                            onChange={(imageList) => this.setState({ ...this.state, images: imageList })}
                                            maxNumber="5"
                                            dataURLKey="data_url"
                                        >
                                            {({
                                                imageList,
                                                onImageUpload,
                                                onImageRemoveAll,
                                                onImageUpdate,
                                                onImageRemove,
                                                isDragging,
                                                dragProps,
                                            }) => (
                                                // write your building UI
                                                <div className="upload__image-wrapper border-blue-400 border-2 border-dotted bg-blue-100 min-h-40 p-10 mb-3">
                                                    <button
                                                        style={isDragging ? { color: 'red' } : undefined}
                                                        onClick={onImageUpload}
                                                        {...dragProps}
                                                        className="px-5"
                                                    >
                                                        Click or Drop here
                                                    </button>
                                                    &nbsp;
                                                    <button onClick={onImageRemoveAll}>Remove all images</button>
                                                    <div className="flex gap-2 mt-2">
                                                        {imageList.map((image, index) => (
                                                            <div key={index} className="image-item">
                                                                <img src={image['data_url']} alt="" width="100" />
                                                                <div className="image-item__btn-wrapper mt-1 text-sm">
                                                                    <button onClick={() => onImageUpdate(index)} className="p-1 bg-green-300 rounded mr-1">Update</button>
                                                                    <button onClick={() => onImageRemove(index)} className="p-1 bg-red-300 rounded">Remove</button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </ImageUploading>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="w-32 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            onClick={this.submitReview}
                                        >
                                            Post it!
                                        </button>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>

            </div >
        )
    }
}
