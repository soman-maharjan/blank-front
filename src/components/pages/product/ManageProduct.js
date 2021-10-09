import { Skeleton } from '@mui/material';
import axios from 'axios'
import { useEffect, useState } from 'react';
import Modal from '../modal/Modal';

export default function ManageProduct(props) {

    const [products, setProducts] = useState([]);
    const [id, setId] = useState("");
    const [open, setOpen] = useState(false)

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        axios.get('api/user-product')
            .then(response => setProducts(response.data))
            .catch(error => console.log(error))
            .then(() => setLoading(false))
    }, []);

    const statusHandler = (id) => {
        axios.post(`api/product-status/${id}`)
            .then(response => setProducts(response.data))
            .catch(error => console.log(error))
    }

    const submitHandler = () => {
        axios.delete('/api/product/' + id)
            .then(response => setProducts(products.filter(p => p._id !== id)))
            .catch(error => console.log(error))
    }

    const val = {
        open: open,
        setOpen: setOpen,
        submit: submitHandler,
        message: "Are you sure you want to delete this product? All of the data will be permanently removed. This action cannot be undone.",
        title: "Delete product",
        success: "Delete"
    }

    return (
        <div className="w-11/12">
            <div class="text-sm breadcrumbs mt-3">
                <ul>
                    <li>
                        <a onClick={() => props.changePage({}, 'dashboard')}>Dashboard</a>
                    </li>
                    <li>Products</li>
                </ul>
            </div>
            {/* <h1 className="text-2xl mb-10">Manage Products</h1> */}
            <div class="navbar shadow mt-3 mb-5 bg-white">
                <div class="flex-1 px-2 mx-2">
                    <span class="text-lg font-semibold">
                        Products
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
                        <a className="btn btn-ghost btn-sm rounded-btn bg-green-300" onClick={() => props.changePage({}, 'add-product')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Product
                        </a>
                    </div>
                </div>
            </div>

            <div className="flex flex-col mt-2">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block sm:px-6 lg:px-8 min-w-full">
                        <div className="shadow overflow-hidden border-b border-gray-300 ">
                            <table className="divide-y divide-gray-200 min-w-full">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Product Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Category
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Display Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Change Visibility
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 min-w-full">
                                    {products.length < 1 ?
                                        <tr>
                                            <td colspan="5" className="px-6 py-4 min-w-sm whitespace-normal">
                                                No data available in table
                                            </td>
                                        </tr>
                                        :
                                        null}

                                    {products.map((product, index) => (
                                        <tr key={index}>
                                            <td className="max-w-xs px-6 py-4 min-w-sm whitespace-normal">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-full" src={`${process.env.REACT_APP_IMAGE_URL}${product.sku[0].images[0]}`} alt="" />
                                                    </div>
                                                    <div className="ml-4 whitespace-normal">
                                                        <div className="text-sm break-all font-medium text-gray-900">{product.productName}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="max-w-xs px-6 py-4 min-w-sm whitespace-normal break-all">
                                                <div className="text-sm text-gray-900">{product.category}</div>
                                            </td>
                                            <td className="max-w-xs px-6 py-4 min-w-1 whitespace-normal break-all">
                                                {product.is_active ?
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Active
                                                    </span> :
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                        Not Active
                                                    </span>}

                                            </td>
                                            <td className="max-w-xs px-6 py-4 min-w-1 whitespace-normal break-all">
                                                <input onChange={() => statusHandler(product._id)} type="checkbox" checked={product.is_active ? "checked" : ""} class="toggle toggle-accent"></input>
                                            </td>
                                            <td className="flex max-w-xs  py-4 min-w-1 whitespace-normal break-all text-right text-sm font-medium">
                                                <a onClick={() => props.changePage(product, 'edit-product')} className="normal-case btn btn-ghost btn-sm rounded-btn bg-indigo-500 hover:bg-indigo-600 text-white">
                                                    Edit
                                                </a>
                                                <a onClick={() => props.changePage(product, 'view-product')} className="normal-case ml-2 btn btn-ghost btn-sm rounded-btn bg-blue-500 hover:bg-blue-600 text-white">
                                                    View
                                                </a>
                                                <a onClick={() => { setId(product._id); setOpen(true) }} className="normal-case ml-2 btn btn-ghost btn-sm rounded-btn bg-red-500 hover:bg-red-600 text-white">
                                                    Delete
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Modal {...val} />
        </div>
    )
}


