import * as React from 'react';
import axios from 'axios';
import DataTable from "../../table/DataTable";

const columns = [
    { id: 'user_id', label: 'Buyer Id', minWidth: 170, align: 'center' },
    { id: 'order_id', label: 'Order Id', minWidth: 170, align: 'center' },
    {
        id: 'type',
        label: 'Type',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'name',
        label: 'Name',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'options',
        label: 'Options',
        minWidth: 170,
        align: 'center',
    },
];

export default function Payment(props) {
    const [payments, setPayments] = React.useState([]);

    React.useEffect(() => {
        axios.get('api/payment')
            .then(response => setPayments(response.data))
            .catch(error => console.log(error.response))
    }, [])

    const value = (column, row) => {
        switch (column.id) {
            case 'options':
                return (
                    <>
                        <a onClick={() => props.changePage({ page: 'show-payment', payment: row })} className="min-h-0 h-9 w-16 btn btn-ghost btn-sm rounded-btn bg-green-500 hover:bg-green-600 text-white">
                            View
                        </a>
                    </>
                )
            default:
                return (row[column.id])
        }
    }

    return (
        <div className="w-full px-10">
            <div class="text-sm breadcrumbs mt-3">
                <ul>
                    <li>
                        <a onClick={() => props.changePage({ page: 'dashboard' })}>Dashboard</a>
                    </li>
                    <li>Payments</li>
                </ul>
            </div>
            {/* <h1 className="text-2xl mb-10">Manage Products</h1> */}
            <div class="navbar shadow mt-3 mb-5">
                <div class="flex-1 px-2 mx-2">
                    <span class="text-lg font-semibold">
                        Payments
                    </span>
                </div>

                <div class="flex-none">
                    <button class="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            <DataTable columns={columns} filteredData={payments} data={payments} value={value} />
        </div>
    );
}