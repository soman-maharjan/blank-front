import axios from 'axios';
import React, {useEffect, useState} from 'react'
import DataTable from "../table/DataTable";
import Header from "../header/Header";

const columns = [
    {id: 'comment', label: 'Comment'},
    {id: '_id', label: 'Comment Id'},
    {id: 'product_id', label: 'Product Id'},
    {id: 'is_verified', label: 'Verified'},
    {id: 'options', label: 'Options'},
];

export default function Comments(props) {

    const [state, setState] = useState({
        data: [],
        filteredData: []
    });

    useEffect(() => {
        axios.get('/api/comments/seller')
            .then(response => {
                setState({...state, filteredData: response.data, data: response.data})
            })
            .catch(error => console.log(error.response))
    }, [])

    const value = (column, row) => {
        switch (column.id) {
            case 'options':
                return (
                    <>
                        <a onClick={() => props.changePage({page: 'show-comment', comment: row})}
                           className="normal-case mr-2 min-h-0 h-9 w-16 btn btn-ghost btn-sm rounded-btn bg-blue-500 hover:bg-blue-600 text-white">
                            View
                        </a>
                    </>
                )
            case 'is_verified':
                return (
                    row['is_verified'] ?
                        <span
                            className="p-2 px-6 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            Verified
                                                        </span> :
                        <span
                            className="p-2 px-4 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                            Not Verified
                                                        </span>
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
                    <li>Comments</li>
                </ul>
            </div>
            <Header setState={changeState} state={state} header={"Comments"}/>
            <DataTable columns={columns} filteredData={state.filteredData} data={state.data} value={value}/>
        </div>
    )
}
