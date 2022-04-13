import axios from 'axios'
import React, {useEffect, useState} from 'react';
import DeleteModal from '../modal/DeleteModal';
import DataTable from "../table/DataTable";
import {showNotification} from "@mantine/notifications";
import Header from "../header/Header";

const columns = [
    {id: 'productName', label: 'Product Name'},
    {id: 'category', label: 'Category'},
    {id: 'is_active', label: 'Status'},
    {id: 'visibility', label: 'Change Visibility'},
    {id: 'options', label: 'Options'},
];

export default function ManageProduct(props) {

    const [state, setState] = useState({
        data: [],
        filteredData: []
    });

    const [id, setId] = useState("");
    const [open, setOpen] = useState(false)

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        axios.get('api/user-product')
            .then(response => {
                setState({...state, filteredData: response.data, data: response.data})
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, []);

    const statusHandler = (id) => {
        axios.post(`api/product-status/${id}`)
            .then(response => {
                setState({...state, filteredData: response.data, data: response.data})
                const p = response.data.filter(p => p._id == id)
                showNotification({
                    title: 'Product Visibility Changed!',
                    message: p[0].is_active ? 'The product is visible to the customers!' : 'The product is hidden from the customers!',
                    color: p[0].is_active ? "green" : 'red'
                })
            })
            .catch(error => console.log(error))
    }

    const submitHandler = () => {
        axios.delete('/api/product/' + id)
            .then(response => {
                setState({
                    ...state,
                    filteredData: state.data.filter(p => p._id !== id),
                    data: state.data.filter(p => p._id !== id)
                })
                showNotification({
                    title: 'Product Deleted!',
                    message: 'The product has been deleted!',
                    color: "red"
                })
            })
            .catch(error => console.log(error.response))
    }

    const val = {
        open: open,
        setOpen: setOpen,
        submit: submitHandler,
        message: "Are you sure you want to delete this product? All of the data will be permanently removed. This action cannot be undone.",
        title: "Delete product",
        success: "Delete"
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
                        {/* <a onClick={() => props.changePage(row, 'edit-product')} className="normal-case mr-2 min-h-0 h-9 w-16 btn btn-ghost btn-sm rounded-btn bg-indigo-500 hover:bg-indigo-600 text-white">
                                                                Edit
                                                            </a> */}
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

            case 'is_active':
                return (
                    (row['is_active'] ?
                        <span
                            className="p-2 px-6 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            Active
                                                        </span> :
                        <span
                            className="p-2 px-4 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                            Not Active
                                                        </span>)
                )
            case 'visibility':
                return (
                    <input onChange={() => statusHandler(row._id)} type="checkbox"
                           checked={row['is_active'] ? "checked" : ""} className="toggle toggle-accent"/>
                )
            default:
                return (row[column.id])
        }
    }

    return (
        <div className="w-11/12">
            <div class="text-sm breadcrumbs mt-3 flex">
                <ul className="w-1/2">
                    <li>
                        <a onClick={() => props.changePage({page: 'dashboard'})}>Dashboard</a>
                    </li>
                    <li>Products</li>
                </ul>
                <div className="w-1/2 text-right">
                    <div className="px-2 mx-2 ">
                        <a className="btn btn-ghost btn-sm rounded-btn bg-green-300 text-green-700 hover:bg-green-400"
                           onClick={() => props.changePage({page: 'add-product'})}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                            </svg>
                            Add Product
                        </a>
                    </div>
                </div>
            </div>
            <Header setState={changeState} state={state} header={"Products"}/>
            <DataTable columns={columns} filteredData={state.filteredData} data={state.data} value={value}/>
            <DeleteModal {...val} />
        </div>
    )
}


