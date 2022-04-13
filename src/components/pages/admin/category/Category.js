import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom";

export default function Category(props) {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get('/api/category')
            .then(response => setCategory(response.data))
            .catch(error => console.log(error))
    }, [])

    // const data = category.map(cat => <h1>{cat.title}</h1>)

    return (
        <div className="w-11/12">
            <div class="text-sm breadcrumbs mt-3">
                <ul>
                    <li>
                        <a onClick={() => props.changePage({ page: 'dashboard' })}>Dashboard</a>
                    </li>
                    <li>Category</li>
                </ul>
            </div>
            {/* <h1 className="text-2xl mb-10">Manage Products</h1> */}
            <div class="navbar shadow mt-3 mb-5 bg-white">
                <div class="flex-1 px-2 mx-2">
                    <span class="text-lg font-semibold">
                        CATEGORIES
                    </span>
                </div>


                <div class="flex-none hidden px-2 mx-2 lg:flex">
                    <div class="flex items-stretch text-white">
                        <a className="btn btn-ghost btn-sm rounded-btn bg-green-400 hover:bg-green-500" onClick={() => props.changePage({ page: 'add-category' })}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Category
                        </a>
                    </div>
                </div>
            </div>

            <div className="flex flex-col flex-wrap text-left bg-white mt-1 px-10">
                {category.map((cat, index) =>
                    (cat.parent == null ?
                        <div className="list-with-heading mb-5 mt-2">
                            <Link to={`/category/${cat.title}`}><h3 className="my-1 font-semibold">{index + 1}. {cat.title}</h3></Link>
                            <ul>
                                {category.map(c => (c.parent === cat.title ? <Link to={`/category/${c.title}`}><li className="pl-7 my-1">{c.title}</li></Link> : null))}
                            </ul>
                        </div> :
                        null)
                )
                }
            </div >

        </div>
    )
}
