import axios from 'axios';
import React, {useEffect, useState} from 'react'
import Moment from 'react-moment';
import Loading from '../../Loading';

export default function EditUser(props) {

    const [user, setUser] = useState(props.user)
    const [roles, setRoles] = useState([])

    const [userRoles, setUserRoles] = useState([]);

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState({});

    const changeHandler = (event) => {
        setUser({...user, [event.target.name]: event.target.value})
    }

    useEffect(() => {
        setLoading(true);
        axios.get('/api/roles')
            .then(response => {
                setLoading(false)
                setRoles(response.data)
            })
            .catch(error => {
                setLoading(false)
                setError(error.response)
            })
    }, [])

    useEffect(() => {
        const checkboxRoles = [];
        roles.map(r => {
            checkboxRoles.push({[r]: (user.role && user.role.includes(r))})
        })

        setUserRoles(checkboxRoles);
    }, [roles]);

    const submit = (event) => {
        event.preventDefault();
        setLoading(true)
        axios.put('/api/users/' + user._id, {...user, roles: userRoles})
            .then(response => {
                setLoading(false)
                console.log(response.data)
                setUser(response.data.data)
            })
            .catch(error => {
                setLoading(false)
                console.log(error.response)
            })
    }

    const toggleHandler = (role) => {
        const val = userRoles;
        var obj = {};
        val.map((v, index) => {
            if (Object.keys(v) == role) {
                obj[role] = !Object.values(v)[0];
                val[index] = obj;
            }
        })
        setUserRoles([...val]);
    }

    return loading ? <Loading/> : (
        <div className="w-11/12">
            <div class="text-sm breadcrumbs mt-3">
                <ul>
                    <li>
                        <a onClick={() => props.changePage({page: 'dashboard'})}>Dashboard</a>
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

            <div className="mt-10 sm:mt-0 mb-10">
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
                                            className="px-3 min-h-0 h-10 border border-gray-400 outline-none mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md  rounded-md"
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
                                            className="px-3 min-h-0 h-10 border border-gray-400 outline-none mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="email" className="block text-md font-medium text-gray-700">
                                            Bio
                                        </label>
                                        <textarea
                                            className="p-3 border border-gray-400 outline-none mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                                            name="bio"
                                            onChange={changeHandler} cols="30" rows="10" value={user.bio}>

                                        </textarea>
                                    </div>
                                    <div className="col-span-6">
                                        <div className="grid grid-cols-6 gap-y-2 gap-x-6 text-left pt-3">
                                            <div className="col-span-3">
                                                <label htmlFor="email"
                                                       className="block text-md font-medium text-gray-700">
                                                    Joined On
                                                </label>
                                                <Moment format="YYYY/MM/DD">{user.created_at}</Moment>
                                            </div>
                                            <div className="col-span-3 text-right">
                                                <label htmlFor="email"
                                                       className="block text-md font-medium text-gray-700">
                                                    Updated On
                                                </label>
                                                <Moment format="YYYY/MM/DD">{user.updated_at}</Moment>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-6">
                                        <label htmlFor="roles" className="block text-md font-medium text-gray-700">
                                            Roles
                                        </label>
                                        <div className="grid grid-cols-6 gap-y-2 gap-x-6 text-left pt-2">
                                            {userRoles.map((r) =>
                                                <>
                                                    <div className="col-span-3 capitalize">
                                                        {Object.keys(r)}
                                                    </div>
                                                    <div className="col-span-3">
                                                        {/*<Switch onChange={() => toggleHandler(r)}*/}
                                                        {/*        checked={userRoles[r]}/>*/}
                                                        <input
                                                            name={Object.keys(r)}
                                                            type="checkbox"
                                                            onChange={() => toggleHandler(Object.keys(r)[0])}
                                                            checked={Object.values(r)[0] ? "checked" : ""}
                                                            className="toggle toggle-accent">
                                                        </input>
                                                    </div>
                                                </>
                                            )}
                                        </div>
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
