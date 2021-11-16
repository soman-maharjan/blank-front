import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function UpdatePassword() {
    const [state, setstate] = useState({
        current_password: "",
        new_password: "",
        confirm_password: ""
    })

    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [response, setResponse] = useState({});
    const [passwordError, setPasswordError] = useState(false);

    const [error, setError] = useState("");


    const changeHandler = (event) => {
        setstate({ ...state, [event.target.name]: event.target.value })
    }

    const changePassword = (event) => {
        event.preventDefault();
        if (state.confirm_password != "" && state.current_password != "" && state.new_password != "") {
            axios.post('api/change-password', state)
                .then(response => {
                    setError("");
                    console.log(response)
                })
                .catch(error => setError(error.response.data.error))
        }
    }

    useEffect(() => {
        if (state.new_password !== "") {
            if (/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(state.new_password)) {
                setPasswordError(false);
            } else {
                setPasswordError(true);
            }
        }
    }, [state.new_password]);

    useEffect(() => {
        if (state.confirm_password !== "") {
            if (state.new_password === state.confirm_password) {
                setConfirmPasswordError(false);
            } else {
                setConfirmPasswordError(true);
            }
        }
    }, [state.confirm_password]);

    return (
        <div className="mb-5">
            <form>
                <div className="grid grid-cols-1 gap-4 pt-7 pb-3 text-left px-5">
                    {error ? <p className="text-red-500 text-xs italic">{error}</p> : null}
                    <div className="">
                        <label htmlFor="name" className="">Current Password</label>
                        <input type="password" name="current_password" onChange={changeHandler} value={state.current_password} className={` ${response.hasOwnProperty('error') ? "border-red-600" : null}appearance-none block w-full bg-gray-50 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500`} />
                    </div>
                    <div className="">
                        <label htmlFor="email" className="">New Password</label>
                        <input type="password" name="new_password" onChange={changeHandler} value={state.new_password} className="appearance-none block w-full bg-gray-50 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" />
                    </div>
                    {passwordError ? <p className="text-red-500 text-xs italic">Enter a valid Password</p> : null}
                    <div className="">
                        <label htmlFor="name" className="">Confirm New Password</label>
                        <input type="password" name="confirm_password" onChange={changeHandler} value={state.confirm_password} className="appearance-none block w-full bg-gray-50 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" />
                    </div>
                    {confirmPasswordError ? <p className="text-red-500 text-xs italic">Password Do not Match</p> : null}
                </div>
                <button className="p-2 mt-3 bg-indigo-500 text-white rounded" onClick={changePassword}>Update Password</button>
            </form>
        </div>
    )
}
