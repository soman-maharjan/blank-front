import axios from 'axios';
import React, {useEffect, useState} from 'react'
import DeleteModal from '../../modal/DeleteModal';
import DataTable from "../../table/DataTable";
import {showNotification} from "@mantine/notifications";
import Header from "../../header/Header";

const columns = [
    {id: 'comment', label: 'Comment'},
    {id: '_id', label: 'Comment Id'},
    {id: 'product_id', label: 'Product Id'},
    {id: 'is_verified', label: 'Verified'},
    {id: 'options', label: 'Options'},
];

export default function Comments(props) {

    const [state, setState] = useState({
        data: [],
        filteredData: []
    });

    const [id, setId] = useState("");

    const [open, setOpen] = useState(false)

    useEffect(() => {
        // get all comment fron the server
        axios.get('/api/comments')
            .then(response => setState({...state, filteredData: response.data, data: response.data}))
            .catch(error => console.log(error.response))
    }, [])

    const submitHandler = () => {
        // delete request with id to delete the comment
        axios.delete('/api/comments/' + id)
            .then(response => {
                setState({
                    ...state,
                    filteredData: state.data.filter(u => u._id !== id),
                    data: state.data.filter(u => u._id !== id)
                })
                showNotification({
                    title: 'Comment Deleted!',
                    message: 'The comment has been deleted!',
                    color: "red"
                })
            })
            .catch(error => console.log(error))
    }

    // value function contains all the values in for the table column
    const value = (column, row) => {
        switch (column.id) {
            case 'options':
                return (
                    <>
                        <a onClick={() => props.changePage({page: 'show-comment', comment: row})}
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

    //modal options
    const val = {
        open: open,
        setOpen: setOpen,
        submit: submitHandler,
        message: "Are you sure you want to delete this account? All of the data will be permanently removed. This action cannot be undone.",
        title: "Delete account",
        success: "Delete"
    }

    const changeState = ({data, filteredData}) => {
        setState({
            ...state,
            data: data,
            filteredData: filteredData
        })
    }

    return (
        <div className="w-11/12">
            <div class="text-sm breadcrumbs mt-3">
                <ul>
                    <li>
                        <a onClick={() => props.changePage({page: 'dashboard'})}>Dashboard</a>
                    </li>
                    <li>Comments</li>
                </ul>
            </div>
            <Header setState={changeState} state={state} header={"Comments"}/>
            <DataTable columns={columns} filteredData={state.filteredData} data={state.data} value={value}/>
            <DeleteModal {...val} />
        </div>
    )
}
