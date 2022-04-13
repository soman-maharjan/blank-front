import {Rating} from '@mui/material';
import React from 'react'
import Moment from "react-moment";

export default function Review(props) {
    const {data} = props;
    console.log(data)
    const img =
        data.images.length != 0 ?
            data.images.map(i =>
                <div><img src={`${process.env.REACT_APP_URL}storage/images/${i}`} className="h-20 w-20"/></div>
            )
            : "";
    return (
        <div className="mb-4 border-b pb-3">
            <Rating name="read-only" value={data.rating} readOnly size="small"/>
            <p className="-my-1 text-gray-500 text-sm ">by {data.user ? data.user.name : ""} <span
                className="float-right"><Moment
                fromNow>{data.created_at}</Moment></span></p>
            <p>{data.review}</p>
            <p className="-my-1 text-gray-500 text-sm capitalize">{data.suborder.variation} : {data.suborder.sku.value}</p>
            <div className="mt-3 flex gap-6">
                {img}
            </div>
        </div>
    )
}
