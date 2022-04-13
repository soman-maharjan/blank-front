import * as React from 'react';
import {useState} from 'react';
import axios from 'axios';
import DataTable from "../../table/DataTable";
import Header from "../../header/Header";

const columns = [
    {id: 'user_id', label: 'Buyer Id'},
    {id: 'order_id', label: 'Order Id'},
    {id: 'type', label: 'Type'},
    {id: 'name', label: 'Name'},
    {id: 'options', label: 'Options'},
];

export default function Payment(props) {
    const [state, setState] = useState({
        data: [],
        filteredData: []
    });

    React.useEffect(() => {
        axios.get('api/payment')
            .then(response => setState({...state, filteredData: response.data, data: response.data}))
            .catch(error => console.log(error.response))
    }, [])

    const value = (column, row) => {
        switch (column.id) {
            case 'options':
                return (
                    <>
                        <a onClick={() => props.changePage({page: 'show-payment', payment: row})}
                           className="min-h-0 h-9 w-16 btn btn-ghost btn-sm rounded-btn bg-green-500 hover:bg-green-600 text-white">
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
        <div className="w-full px-10">
            <div class="text-sm breadcrumbs mt-3">
                <ul>
                    <li>
                        <a onClick={() => props.changePage({page: 'dashboard'})}>Dashboard</a>
                    </li>
                    <li>Payments</li>
                </ul>
            </div>
            <Header setState={changeState} state={state} header={"Payments"}/>
            <DataTable columns={columns} filteredData={state.filteredData} data={state.data} value={value}/>
        </div>
    );
}