import React, {useEffect, useState} from 'react';
import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';

import {Line, Pie} from 'react-chartjs-2';
import axios from "axios";
import {ClipboardListIcon} from "@heroicons/react/outline";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export const options = {
    responsive: true,
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Revenue',
            data: [10000, 15000, 20000, 18000, 30000, 40000, 20000, 50000, 55000, 70000, 60000, 50000],
            borderColor: 'rgb(255,99,132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};

const pieData = {
    labels: ['Electronics', 'Health & Beauty', "Men's Fashion", "Women's Fashion", 'Watches'],
    datasets: [
        {
            label: 'Dataset 1',
            data: [10000, 15000, 20000, 18000, 30000],
            backgroundColor: [
                '#ba8880',
                '#dd563e',
                '#fa6f5c',
                '#f5a179',
                '#fcee7f',
                '#9ae267',
            ],
        }
    ]
};

export default function UserDashboardDetails() {
    const [state, setState] = useState({})

    useEffect(() => {
        axios.get('api/dashboard/customer/data')
            .then(response => setState(response.data))
            .catch(error => console.log(error.response))
    }, [])

    return (
        <div className="flex-none w-full p-10 pt-5">
            <div className="text-left pb-2 text-2xl font-bold">OVERVIEW</div>
            <div className="w-full flex gap-6">
                <div className="w-1/3 shadow-md rounded h-24 flex bg-white">
                    <div className="w-2/6">
                        <ClipboardListIcon className="h-12 w-12 mt-5 ml-10 bg-indigo-500 rounded p-3 text-white "/>
                    </div>
                    <div className="w=4/6 pt-4">
                        <h1 className="text-gray-500 font-semibold text-md">Your Total Orders</h1>
                        <p className="font-bold text-2xl">
                            {state.orderCount}
                        </p>
                    </div>
                </div>
                <div className="w-1/3 shadow-md rounded h-24 flex bg-white">
                    <div className="w-2/6">
                        <svg className="h-12 w-12 mt-5 ml-10 bg-indigo-500 rounded p-3 text-white"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                             strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                    </div>
                    <div className="w=4/6 pt-4">
                        <h1 className="text-gray-500 font-semibold text-md">Total Pending Orders</h1>
                        <p className="font-bold text-2xl">
                            {state.pendingOrderCount}
                        </p>
                    </div>
                </div>
                <div className="w-1/3 shadow-md rounded h-24 flex bg-white">
                    <div className="w-2/6">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="h-12 w-12 mt-5 ml-10 bg-indigo-500 rounded p-3 text-white" fill="none"
                             viewBox="0 0 24 24"
                             stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                    </div>
                    <div className="w=4/6 pt-4">
                        <h1 className="text-gray-500 font-semibold text-md">Total Amount Spent</h1>
                        <p className="font-bold text-2xl flex">
                            Rs. {state.totalAmountSpent ? state.totalAmountSpent.toFixed(2) : "0"}
                        </p>
                    </div>
                </div>


            </div>
            <div className="w-full flex gap-5">
                <div className='w-2/3 bg-white mt-4 p-4 rounded shadow-md'>
                    <Line options={options} data={data}/>
                </div>
                <div className='w-1/3 bg-white mt-4 p-4 rounded shadow-md'>
                    <Pie options={options} data={pieData}/>
                </div>
            </div>
        </div>
    )
}

