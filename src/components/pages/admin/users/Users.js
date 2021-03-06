import axios from 'axios';
import React, {useEffect, useState} from 'react'
import DeleteModal from '../../modal/DeleteModal';
import DataTable from "../../table/DataTable";
import {showNotification} from "@mantine/notifications";
import Header from "../../header/Header";

const columns = [
    {id: '_id', label: 'User Id'},
    {id: 'name', label: 'Name'},
    {id: 'email', label: 'Email'},
    {id: 'bio', label: 'Bio'},
    {id: 'options', label: 'Options'},
];

export default function ShowUsers(props) {

    const [state, setState] = useState({
        data: [],
        filteredData: []
    });

    const [id, setId] = useState("");

    const [open, setOpen] = useState(false)

    useEffect(() => {
        axios.get('/api/users')
            .then(response => {
                setState({...state, filteredData: response.data, data: response.data})
            })
            .catch(error => console.log(error.response))
    }, [])

    const submitHandler = () => {
        axios.delete('/api/users/' + id)
            .then(response => {
                setState({
                    ...state,
                    filteredData: state.data.filter(u => u._id !== id),
                    data: state.data.filter(u => u._id !== id)
                })
                showNotification({
                    title: 'User Deleted!',
                    message: 'The user account has been deleted!',
                    color: "red"
                })
            })
            .catch(error => console.log(error))
    }

    const val = {
        open: open,
        setOpen: setOpen,
        submit: submitHandler,
        message: "Are you sure you want to delete this account? All of the data will be permanently removed. This action cannot be undone.",
        title: "Delete account",
        success: "Delete"
    }

    const value = (column, row) => {
        switch (column.id) {
            case 'options':
                return (
                    <>
                        <a onClick={() => props.changePage({page: 'edit-user', user: row})}
                           className="normal-case mr-2 min-h-0 h-9 w-16 btn btn-ghost btn-sm rounded-btn bg-blue-500 hover:bg-blue-600 text-white">
                            Edit
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
            default:
                return (row[column.id])
        }
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
                    <li>Users</li>
                </ul>
            </div>

            <Header setState={changeState} state={state} header={"Users"}/>
            <DataTable columns={columns} filteredData={state.filteredData} data={state.data} value={value}/>

            <DeleteModal {...val} />
        </div>
    )
}
