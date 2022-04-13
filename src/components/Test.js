import axios from 'axios'
import React, { useEffect } from 'react'

export default function Test() {

    useEffect(() => {
        axios.get('/api/test')
            .then(response => console.log(response))
            .catch(error => console.log(error.response))
    }, [])

    return (
        <div>
            Test Page
        </div>
    )
}
