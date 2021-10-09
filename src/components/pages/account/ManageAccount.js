import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function ManageAccount() {

    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get('api/user')
            .then(response => setUser(response.data))
            .catch(error => console.log(error.response))
    }, [])

    return (
        <div className="w-full p-10">
            <div class="grid grid-cols-3 gap-4 w-full">
                <div className="p-4 bg-white text-left">
                    <h1 className="mb-2">Personal Profile | <span style={{ 'color': '#1a9cb7' }} className="cursor-pointer">Edit</span></h1>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                </div>
                <div className="bg-green-500">2</div>
                <div className="bg-blue-500">9</div>
            </div>
        </div>
    )
}
