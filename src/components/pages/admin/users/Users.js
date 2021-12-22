import axios from 'axios';
import React, {useEffect, useState} from 'react'
import DeleteModal from '../../modal/DeleteModal';
import DataTable from "../../table/DataTable";

const columns = [
    {id: '_id', label: 'User Id', minWidth: 170, align: 'center'},
    {id: 'name', label: 'Name', minWidth: 170, align: 'center'},
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
            .then(response => {
                console.log(response.data)
                setUsers(response.data)
            })
            .catch(error => console.log(error.response))
    }, [])

    const submitHandler = () => {
        axios.delete('/api/users/' + id)
            .then(response => setUsers(users.filter(u => u._id !== id)))
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
            {/* <h1 className="text-2xl mb-10">Manage Products</h1> */}
            <div class="navbar shadow mt-3 mb-5">
                <div class="flex-1 px-2 mx-2">
                    <span class="text-lg font-semibold">
                        Users
                    </span>
                </div>

                <div class="flex-none">
                    <button class="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </button>
                </div>
            </div>

            <DataTable columns={columns} filteredData={users} data={users} value={value}/>

            <DeleteModal {...val} />
        </div>
    )
}
