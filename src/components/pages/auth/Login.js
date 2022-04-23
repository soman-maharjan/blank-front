import React, { useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';
import { useHistory } from 'react-router';
import { LoginAction } from '../../../redux/actions/AuthAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../homepage/Navbar';
import Footer from '../homepage/Footer';
import Loading from '../Loading';
import FacebookLogin from 'react-facebook-login';

export default function Login() {

    const responseFacebook = (response) => {
        console.log(response);
    }

    const history = useHistory();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        email: "",
        password: "",
        error: ""
    })

    const changeHandler = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    // const auth = useSelector(state => state.userAuth.isAuthenticated);

    const login = (event) => {
        event.preventDefault();
        dispatch(LoginAction(state, history));
    }

    const authResponse = useSelector(state => state.userAuth.authResponse)

    return authResponse === "LOADING" ?
        <Loading />
        : (
            <>
                <Navbar />
                <div className="pb-28 flex pt-20 justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
                    {/* <button onClick={this.logout}>Logout</button> */}
                    <div className="max-w-md w-full space-y-8">
                        <div>
                            <img
                                className="mx-auto h-12 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                alt="Workflow"
                            />
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                        </div>
                        {state.error}
                        <form className="mt-8 space-y-6" onSubmit={login}>
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
                                        className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Email address"
                                        onChange={changeHandler}
                                        value={state.email}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">
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
                            </div>
                            {authResponse.error ? <p className="text-sm text-red-600">{authResponse.error}</p> : null}
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-right w-full">
                                    <Link to="/forgot-password" className="text-right font-medium text-indigo-600 hover:text-indigo-500">
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                Sign in
                            </button>

                            <FacebookLogin
                                appId="251897246847379"
                                fields="email,name,picture"
                                callback={responseFacebook}
                                cssClass="loginBtn loginBtn--facebook"
                            />
                        </form>
                        <p className="mt-3">New Member?<Link to='/register'> <span className="link"> Register Here</span></Link></p>
                    </div>
                </div>
                <Footer />
            </>
        )
}
