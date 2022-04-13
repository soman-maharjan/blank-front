import axios from 'axios';
import React, {useEffect, useState} from 'react'
import Moment from "react-moment";
import {Rating} from "@mui/material";
import DataTable from "../table/DataTable";
import Header from "../header/Header";

const columns = [
    {id: '_id', label: 'Review Id'},
    {id: 'created_at', label: 'Review Date'},
    {id: 'rating', label: 'Rating'},
    {id: 'review', label: 'Review'},
    {id: 'options', label: 'Options'},
];

export default function Reviews(props) {

    const [state, setState] = useState({
        data: [],
        filteredData: []
    });

    useEffect(() => {
        axios.get('/api/reviews/seller')
            .then(response => {
                setState({...state, filteredData: response.data, data: response.data})
            })
            .catch(error => console.log(error.response))
    }, [])


    const value = (column, row) => {
        switch (column.id) {
            case "created_at":
                return (<Moment format="YYYY/MM/DD">{row['created_at']}</Moment>)
            case 'rating':
                return (<Rating value={row[column.id]} readOnly/>)
            case 'options':
                return (
                    <>
                        <a onClick={() => props.changePage({page: 'review', review: row})}
                           className="normal-case mr-2 min-h-0 h-9  btn btn-ghost btn-sm rounded-btn bg-blue-500 hover:bg-blue-600 text-white">
                            View
                        </a>
                    </>
                )
            default:
                return (row[column.id])
        }
    }

    const changeState = ({data, filteredData}) => {
        setState({
            ...state,
            data: data,
            filteredData: filteredData
        })
    }

    return (
        <div className="w-11/12">
            <div class="text-sm breadcrumbs mt-3">
                <ul>
                    <li>
                        <a onClick={() => props.changePage({page: 'dashboard'})}>Dashboard</a>
                    </li>
                    <li>Reviews</li>
                </ul>
            </div>

            <Header setState={changeState} state={state} header={"Review From Customers"}/>
            <DataTable columns={columns} filteredData={state.filteredData} data={state.data} value={value}/>
        </div>
    )
}
