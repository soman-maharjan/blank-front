import React from 'react'

export default function Ad() {
    return (
        <div className="my-10 mx-5">
            <div className="grid grid-rows-3 grid-flow-col gap-1">
                <div className="row-span-3 bg-red-200 "></div>
                <div className="col-span-2 bg-green-200 h-40"></div>
                <div className="row-span-2 col-span-2 bg-blue-200"></div>
            </div>
        </div>
    )
}
