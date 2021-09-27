import React, { useState } from 'react';
import { RefreshIcon } from '@heroicons/react/solid';
import { useSelector } from 'react-redux';
import Navbar from '../homepage/Navbar';
import Footer from '../homepage/Footer';
import Loading from '../Loading';
import axios from 'axios';
import { Alert } from '@mui/material';

export default function Login() {

    const [state, setState] = useState({
        email: ""
    })

    const [response, setResponse] = useState({});
    const [loading, setLoading] = useState(false);

    const changeHandler = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const submitHandler = (event) => {
        setLoading(true)
        event.preventDefault()

        axios.get('/sanctum/csrf-cookie')
            .then(response => {
                axios.post('api/forgot-password', state)
                    .then(response => {
                        setLoading(false)
                        setResponse(response.data)
                    })
                    .catch(error => {
                        setLoading(false)
                        setResponse(error.response.data)
                    })
            })
            .catch(error => {
                console.log(error.response)
                setLoading(false)
            })
    }

    var alert = [];
    if (response.hasOwnProperty('errors') && response.hasOwnProperty('message')) {
        alert = <Alert severity="error" className="justify-center">{response.errors.email}</Alert>
    } else if (response.hasOwnProperty('message')) {
        alert = <Alert severity="success" className="justify-center">{response.message}</Alert>
    }


    return loading ?
        <Loading />
        : (
            <>
                <Navbar />
                {alert}
                <div className="pb-52 flex pt-20 justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <div>
                            <img
                                className="mx-auto h-12 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                alt="Workflow"
                            />
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset Password</h2>
                        </div>
                        {state.error}
                        <form className="mt-8 space-y-6" onSubmit={submitHandler}>
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor="email-address" className="sr-only">
                                        Email address
                                    </label>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Email address"
                                        onChange={changeHandler}
                                        value={state.email}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <RefreshIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                Send Password Reset Link
                            </button>
                        </form>
                    </div>
                </div>
                <Footer />
            </>
        )
}
