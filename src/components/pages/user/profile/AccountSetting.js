import axios from 'axios'
import React, { useState } from 'react'

export default function AccountSetting(props) {
    const [state, setstate] = useState(props.user)
    const [loading, setLoading] = useState(false)

    const changeHandler = (event) => {
        setstate({ ...state, [event.target.name]: event.target.value });
    }

    const updateProfile = () => {
        setLoading(true);
        axios.put('/api/users/' + state._id, state)
            .then(response => {
                console.log(response.data)
                setLoading(false);
            })
            .catch(error => {
                console.log(error.response)
                setLoading(false);
            })
    }

    return (
        <div className="mb-5">
            <div className="grid grid-cols-1 gap-4 pt-7 pb-3 text-left px-5">
                <div className="">
                    <label htmlFor="name" className="">Name</label>
                    <input type="text" name="name" onChange={changeHandler} value={state.name} className="appearance-none block w-full bg-gray-50 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" />
                </div>
                <div className="">
                    <label htmlFor="email" className="">Email</label>
                    <input type="text" name="email" onChange={changeHandler} value={state.email} disabled className="appearance-none block w-full bg-gray-50 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" />
                </div>
                <div className="">
                    <label htmlFor="name" className="">Bio</label>
                    <textarea type="text" name="bio" onChange={changeHandler} className="appearance-none block w-full bg-gray-50 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" >
                        {state.bio}
                    </textarea>
                </div>
            </div>
            <button className={`p-2 mt-3 bg-indigo-500 text-white rounded px-4 ${loading ? "animate-spin" : ""}`} onClick={updateProfile}>Update</button>
        </div>
    )
}
