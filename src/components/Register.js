import React, { useState } from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'
import { useHistory } from 'react-router'
import { LoginAction, RegisterAction } from '../redux/actions/AuthAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Register() {

    const authResponse = useSelector(state => state.userAuth.authResponse)

    const history = useHistory();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        error: ""
    })

    const changeHandler = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }


    const register = (event) => {
        event.preventDefault();

        dispatch(RegisterAction(state, history));
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            {authResponse.hasOwnProperty('email') ? authResponse.email : null} <br />
            {authResponse.hasOwnProperty('password') ? authResponse.password : null}
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
                </div>
                {state.error}
                <form className="mt-8 space-y-6" onSubmit={register}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" >
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="name"
                                autoComplete="name"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="e.g. Soman Maharjan"
                                onChange={changeHandler}
                                value={state.name}
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                onChange={changeHandler}
                                value={state.email}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                onChange={changeHandler}
                                value={state.password}
                            />
                        </div>
                        <div>
                            <label htmlFor="password_confirmation" >
                                Password Confirmation
                            </label>
                            <input
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                onChange={changeHandler}
                                value={state.password_confirmation}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                            </span>
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
