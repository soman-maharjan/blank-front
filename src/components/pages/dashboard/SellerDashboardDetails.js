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
                '#EFFFFD',
                '#B8FFF9',
                '#85F4FF',
                '#42C2FF',
                '#4bbde9',
                '#2597C3',
            ],
        }
    ]
};

export default function SellerDashboardDetails() {
    const [state, setState] = useState({})

    useEffect(() => {
        axios.get('api/dashboard/seller/data')
            .then(response => setState(response.data))
            .catch(error => console.log(error.response))
    }, [])

    return (
        <div className="flex-none w-full p-10 pt-5">
            <div className="text-left pb-2 text-2xl font-bold">OVERVIEW</div>
            <div className="w-full flex gap-6">
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
                        <h1 className="text-gray-500 font-semibold text-md">Total Sales</h1>
                        <p className="font-bold text-2xl flex">{state.totalSales ? state.totalSales.toFixed(2) : ""}
                            <span
                                className="text-sm">{(state.totalSales - state.totalSalesLastMonth) < state.totalSales ?
                                <div className="flex ml-4 mt-1 text-white py-1 px-3 text-bold rounded bg-green-400">
                                    <svg className="flex ml-6 mt-1 text-white py-1 px-3 text-bold rounded bg-green-400"
                                         xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    <span className="text-bold ml-1">{state.totalSalesLastMonth}</span>
                                </div>
                                :
                                <div className="flex ml-4 mt-1 text-white py-1 px-3 text-bold rounded bg-red-500">
                                    <svg className="flex ml-6 mt-1 text-white py-1 px-3 text-bold rounded bg-red-400"
                                         xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    <span className="text-bold ml-1">{state.totalSalesLastMonth}</span>
                                </div>
                            }</span></p>
                    </div>
                </div>
                <div className="w-1/3 shadow-md rounded h-24 flex bg-white">
                    <div className="w-2/6">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="h-12 w-12 mt-5 ml-10 bg-indigo-500 rounded p-3 text-white" fill="none"
                             viewBox="0 0 24 24"
                             stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                        </svg>
                    </div>
                    <div className="w=4/6 pt-4">
                        <h1 className="text-gray-500 font-semibold text-md">Total Products</h1>
                        <p className="font-bold text-2xl flex">{state.productCount} <span
                            className="text-sm">{(state.productCount - state.productLastMonthCount) < state.productCount ?
                            <div className="flex ml-4 mt-1 text-white py-1 px-3 text-bold rounded bg-green-400">
                                <svg className="flex ml-6 mt-1 text-white py-1 px-3 text-bold rounded bg-green-400"
                                     xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20"
                                     fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                                          clipRule="evenodd"/>
                                </svg>
                                <span className="text-bold ml-1">{state.productLastMonthCount}</span>
                            </div>
                            :
                            <div className="flex ml-4 mt-1 text-white py-1 px-3 text-bold rounded bg-red-500">
                                <svg className="flex ml-6 mt-1 text-white py-1 px-3 text-bold rounded bg-red-400"
                                     xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20"
                                     fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"/>
                                </svg>
                                <span className="text-bold ml-1">{state.productLastMonthCount}</span>
                            </div>
                        }</span></p>
                    </div>
                </div>
                <div className="w-1/3 shadow-md rounded h-24 flex bg-white">
                    <div className="w-2/6">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="h-12 w-12 mt-5 ml-10 bg-indigo-500 rounded p-3 text-white" fill="none"
                             viewBox="0 0 24 24"
                             stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                        </svg>
                    </div>
                    <div className="w=4/6 pt-4">
                        <h1 className="text-gray-500 font-semibold text-md">Total Orders</h1>
                        <p className="font-bold text-2xl flex">{state.totalOrders}<span
                            className="text-sm">{(state.totalOrders - state.totalOrdersLastMonth) < state.totalOrders ?
                            <div className="flex ml-2 mt-1 text-white py-1 px-1 text-bold rounded bg-green-400">
                                <svg className="flex ml-6 mt-1 text-white py-1 px-3 text-bold rounded bg-green-400"
                                     xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20"
                                     fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                                          clipRule="evenodd"/>
                                </svg>
                                <span className="text-bold ml-1">{state.totalOrdersLastMonth}</span>
                            </div>
                            :
                            <div className="flex ml-4 mt-1 text-white py-1 px-3 text-bold rounded bg-red-500">
                                <svg className="flex ml-6 mt-1 text-white py-1 px-3 text-bold rounded bg-red-400"
                                     xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20"
                                     fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"/>
                                </svg>
                                <span className="text-bold ml-1">{state.totalOrdersLastMonth}</span>
                            </div>
                        }</span></p>
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

