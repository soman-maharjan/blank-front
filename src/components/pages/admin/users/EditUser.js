import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import Loading from '../../Loading';

export default function EditUser(props) {

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)

    const [error, setError] = useState({});

    const changeHandler = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        setLoading(true);
        axios.get('/api/user')
            .then(response => {
                setLoading(false)
                setUser(response.data)
            })
            .catch(error => {
                setLoading(false)
                setError(error.response)
            })
    }, [])

    const submit = (event) => {
        event.preventDefault();
        setLoading(true)
        axios.put('/api/users/' + user._id, user)
            .then(response => {
                setLoading(false)
                console.log(response.data)
            })
            .catch(error => {
                setLoading(false)
                console.log(error.response)
            })
    }

    return loading ? <Loading /> : (
        <div className="w-11/12">
            <div class="text-sm breadcrumbs mt-3">
                <ul>
                    <li>
                        <a onClick={() => props.changePage({ page: 'dashboard' })}>Dashboard</a>
                    </li>
                    <li>Edit User</li>
                </ul>
            </div>
            <div class="navbar shadow mt-3 mb-5">
                <div class="flex-1 px-2 mx-2">
                    <span class="text-lg font-semibold">
                        Edit User
                    </span>
                </div>
            </div>

            <div className="mt-10 sm:mt-0">
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <form onSubmit={submit}>
                        <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="grid grid-cols-6 gap-6 text-left">
                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="name" className="block text-md font-medium text-gray-700">
                                            First name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={user.name}
                                            onChange={changeHandler}
                                            className="px-3 min-h-0 h-10 border-2 outline-none mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md  rounded-md"
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="email" className="block text-md font-medium text-gray-700">
                                            Email address
                                        </label>
                                        <input
                                            type="text"
                                            name="email"
                                            id="email"
                                            value={user.email}
                                            onChange={changeHandler}
                                            className="px-3 min-h-0 h-10 border-2 outline-none mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="email" className="block text-md font-medium text-gray-700">
                                            Bio
                                        </label>
                                        <textarea
                                            className="p-3 border-2 outline-none mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                                            name="bio"
                                            onChange={changeHandler} cols="30" rows="10" value={user.bio}>
                                        </textarea>
                                    </div>
                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="email" className="block text-md font-medium text-gray-700">
                                            Created at  -  <Moment format="YYYY/MM/DD">{user.created_at}</Moment>
                                        </label>
                                    </div>
                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="email" className="block text-md font-medium text-gray-700">
                                            Updated at  -  <Moment format="YYYY/MM/DD">{user.updated_at}</Moment>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button
                                    type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
