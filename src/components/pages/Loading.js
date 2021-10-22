import React from 'react'
import Loader from 'react-loader-spinner'

export default function Loading() {
    return (
        <div className="flex h-screen">
            <div className="m-auto">
                <Loader
                    type="TailSpin"
                    color="#000000"
                    height={50}
                    width={500}
                /></div>
        </div>
    )
}
