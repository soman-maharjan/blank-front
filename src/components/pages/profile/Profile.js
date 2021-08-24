import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Profile() {

    const [userData, setUserData] = useState()

    useEffect(() => {
        axios.get('/api/user')
            .then(res =>
                setUserData(res.data)
            )
            .catch(err => console.log(err))
    }, [])


    return (
        userData !== undefined ?
            <div>
                Profile
                <h1>{userData.name}</h1>
                <h1>{userData.email}</h1>

            </div>
            :
            null
    )
}
