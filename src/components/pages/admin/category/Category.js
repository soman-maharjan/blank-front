import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Category(props) {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get('/api/category')
            .then(response => setCategory(response.data))
            .catch(error => console.log(error))
    }, [])

    const data = category.map(cat => <h1>{cat.title}</h1>)

    return (
        <div className="w-11/12">
            <div class="text-sm breadcrumbs mt-3">
                <ul>
                    <li>
                        <a onClick={() => this.props.changePage({}, 'dashboard')}>Dashboard</a>
                    </li>
                    <li>Category</li>
                </ul>
            </div>
            {/* <h1 className="text-2xl mb-10">Manage Products</h1> */}
            <div class="navbar shadow mt-3 mb-5">
                <div class="flex-1 px-2 mx-2">
                    <span class="text-lg font-semibold">
                        Add Category
                    </span>
                </div>

                <div class="flex-none">
                    <button class="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
                <div class="flex-none hidden px-2 mx-2 lg:flex">
                    <div class="flex items-stretch">
                        <a className="btn btn-ghost btn-sm rounded-btn bg-green-300" onClick={() => props.changePage('add-category')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Category
                        </a>
                    </div>
                </div>
            </div>

            {data}

        </div>
    )
}
