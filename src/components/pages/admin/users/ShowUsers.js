import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';

export default function ShowUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/api/users')
            .then(response => setUsers(response.data))
            .catch(error => console.log(error.response))
    }, [])

    return (
        <div className="w-11/12">
            <div class="text-sm breadcrumbs mt-3">
                <ul>
                    <li>
                        {/* <a onClick={() => this.props.changePage({}, 'dashboard')}>Dashboard</a> */}
                    </li>
                    <li>Products</li>
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

            <div className="flex flex-col mt-2">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block sm:px-6 lg:px-8 min-w-full">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="divide-y divide-gray-200 min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className=" text-center px-3 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className=" text-center px-3 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className=" text-center px-3 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Description
                                        </th>
                                        <th
                                            scope="col"
                                            className=" text-center px-3 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Created At
                                        </th>
                                        <th
                                            scope="col"
                                            className=" text-center px-3 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Updated At
                                        </th>
                                        <th
                                            scope="col"
                                            className=" text-center px-3 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 ">
                                    {users.map((user, index) => (
                                        <tr key={index}>
                                            <td className="max-w-xs px-3 py-4 min-w-sm whitespace-normal break-all">
                                                <div className="text-sm text-gray-900">{user.name}</div>
                                            </td>
                                            <td className="max-w-xs px-3 py-4 min-w-sm whitespace-normal break-all">
                                                <div className="text-sm text-gray-900">{user.email}</div>
                                            </td>
                                            <td className="max-w-xs px-3 py-4 min-w-sm whitespace-normal break-all">
                                                <div className="text-sm text-gray-900">{user.description}</div>
                                            </td>
                                            <td className="max-w-xs px-3 py-4 min-w-1 whitespace-normal break-all">
                                                <div className="text-sm text-gray-900"><Moment format="YYYY/MM/DD">{user.created_at}</Moment></div>
                                            </td>
                                            <td className="max-w-xs px-3 py-4 min-w-1 whitespace-normal break-all">
                                                <div className="text-sm text-gray-900"><Moment format="YYYY/MM/DD">{user.updated_at}</Moment></div>
                                            </td>
                                            <td className="max-w-xs px-3 py-4 min-w-1 whitespace-normal break-all text-right text-sm font-medium">
                                                <a className="btn btn-ghost btn-sm rounded-btn bg-indigo-500 hover:bg-indigo-600 text-white">
                                                    Edit
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}
