import {Rating} from '@mui/material';
import React from 'react'
import Moment from "react-moment";

export default function Review(props) {
    const {data} = props;
    return (
        <div className="mb-4 border-b pb-3">
            <Rating name="read-only" value={data.rating} readOnly size="small"/>
            <p className="-my-1 text-gray-500 text-sm ">by {data.user.name} <span className="float-right"><Moment fromNow>{data.created_at}</Moment></span></p>
            <p>{data.review}</p>
            <p className="-my-1 text-gray-500 text-sm capitalize">{data.suborder.variation} : {data.suborder.sku.value}</p>
        </div>
    )
}
