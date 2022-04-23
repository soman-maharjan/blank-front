import React, { useState, useEffect } from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'
import { useHistory } from 'react-router'
import { RegisterAction } from '../../../redux/actions/AuthAction';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../homepage/Footer'
import Navbar from '../homepage/Navbar'
import Loading from '../Loading';

export default function Register() {

    const authResponse = useSelector(state => state.userAuth.authResponse)

    const history = useHistory();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    })

    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const changeHandler = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }
    useEffect(() => {
        if (state.password !== "") {
            if (/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(state.password)) {
                setPasswordError(false);
            } else {
                setPasswordError(true);
            }
        }
    }, [state.password]);

    useEffect(() => {
        if (state.password_confirmation !== "") {
            if (state.password === state.password_confirmation) {
                setConfirmPasswordError(false);
            } else {
                setConfirmPasswordError(true);
            }
        }
    }, [state.password_confirmation]);

    const register = (event) => {
        event.preventDefault();
        if (!confirmPasswordError && !passwordError) {
            dispatch(RegisterAction(state, history));
        }
    }


    return authResponse == 'LOADING' ? <Loading /> : (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 mb-10">
                <br />
                <div className="max-w-md w-full">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
                    </div>
                    <form className="mt-8" onSubmit={register}>
                        <div className="text-left rounded-md shadow-sm space-y-5">
                            <div className="">
                                <label htmlFor="name font-bold" >
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="name"
                                    autoComplete="name"
                                    required
                                    className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="e.g. John Doe"
                                    onChange={changeHandler}
                                    value={state.name}
                                />
                            </div>
                            <div className="">
                                <label htmlFor="email-address">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className={` ${authResponse.hasOwnProperty('email') ? "border-red-600" : null} mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm `}
                                    onChange={changeHandler}
                                    value={state.email}
                                />
                                {authResponse.hasOwnProperty('email') ? <p className="text-red-500 text-center">Email Already Exists</p> : null}
                            </div>
                            <div className="">
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    onChange={changeHandler}
                                    value={state.password}
                                />
                                {passwordError ? <p className="text-red-500 text-xs italic">Enter a valid password</p> : null}
                                <div className="px-5 mt-2">
                                    <ul className="list-disc">
                                        <li className="text-xs">The password length must be greater than or equal to 8</li>
                                        <li className="text-xs">The password must contain one or more uppercase characters</li>
                                        <li className="text-xs">The password must contain one or more lowercase characters</li>
                                        <li className="text-xs">The password must contain one or more numeric values</li>
                                        <li className="text-xs">The password must contain one or more special characters</li>
                                    </ul>
                                </div>
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
                                    className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    onChange={changeHandler}
                                    value={state.password_confirmation}
                                />
                                {confirmPasswordError ? <p className="text-red-500 text-xs italic">Password does not match</p> : null}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="mt-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
            <Footer />
        </>
    )
}
