import axios from 'axios';
import React, {useEffect, useState} from 'react'
import DeleteModal from '../../modal/DeleteModal';
import DataTable from "../../table/DataTable";
import {showNotification} from "@mantine/notifications";
import Header from "../../header/Header";

const columns = [
    {id: '_id', label: 'User Id', minWidth: 170, align: 'center'},
    {id: 'productName', label: 'Product Name', minWidth: 170, align: 'center'},
    {id: 'category', label: 'Category', minWidth: 170, align: 'center',},
    {id: 'is_verified', label: 'Status', minWidth: 170, align: 'center',},
    {id: 'options', label: 'Options', minWidth: 170, align: 'center',},
];

export default function Product(props) {

    const [state, setState] = useState({
        data: [],
        filteredData: []
    });

    const [id, setId] = useState("");

    const [open, setOpen] = useState(false)

    useEffect(() => {
        axios.get('/api/all-product')
            .then(response => setState({...state, filteredData: response.data, data: response.data}))
            .catch(error => console.log(error.response))
    }, [])

    const submitHandler = () => {
        axios.delete('/api/product/' + id)
            .then(response => {
                console.log(response.data)
                setState({
                    ...state,
                    filteredData: state.data.filter(u => u._id !== id),
                    data: state.data.filter(u => u._id !== id)
                })
                showNotification({
                    title: 'Product Deleted!',
                    message: 'The product has been deleted!',
                    color: "red"
                })
            })
            .catch(error => {
                    showNotification({
                        title: 'Product cannot be deleted!',
                        message: error.response.data.message,
                        color: "red"
                    })
                }
            )
    }

    const changeState = ({data, filteredData}) => {
        setState({
            ...state,
            data: data,
            filteredData: filteredData
        })
    }

    const value = (column, row) => {
        switch (column.id) {
            case 'options':
                return (
                    <>
                        <a onClick={() => props.changePage({page: 'view-product', product: row})}
                           className="normal-case mr-2 min-h-0 h-9 w-16 btn btn-ghost btn-sm rounded-btn bg-blue-500 hover:bg-blue-600 text-white">
                            View
                        </a>
                        <a onClick={() => {
                            setId(row._id);
                            setOpen(true);
                        }}
                           className="normal-case min-h-0 h-9 w-16 btn btn-ghost btn-sm rounded-btn bg-red-500 hover:bg-red-600 text-white">
                            Delete
                        </a>
                    </>
                )
            case 'is_verified':
                return (
                    row['is_verified'] ?
                        <span
                            className="p-2 px-6 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            Verified
                                                        </span> :
                        <span
                            className="p-2 px-4 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                            Not Verified
                                                        </span>
                )
            default:
                return (row[column.id])
        }
    }

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
                        <a onClick={() => props.changePage({page: 'dashboard'})}>Dashboard</a>
                    </li>
                    <li>Products</li>
                </ul>
            </div>
            <Header setState={changeState} state={state} header={"Products"}/>
            <DataTable columns={columns} filteredData={state.filteredData} data={state.data} value={value}/>
            <DeleteModal {...val} />
        </div>
    )
}
