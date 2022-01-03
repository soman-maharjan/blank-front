import axios from 'axios'
import React, {useEffect, useState} from 'react';
import DeleteModal from '../modal/DeleteModal';
import DataTable from "../table/DataTable";

const columns = [
    {id: 'productName', label: 'Product Name', minWidth: 170, align: 'center'},
    {
        id: 'category',
        label: 'Category',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'is_active',
        label: 'Status',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'visibility',
        label: 'Change Visibility',
        minWidth: 130,
        align: 'center',
    },
    {
        id: 'options',
        label: 'Options',
        minWidth: 210,
        align: 'center',
    },
];

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
            .then(response => {console.log(response)
                setProducts(products.filter(p => p._id !== id))})
            .catch(error => console.log(error.response))
    }

    const val = {
        open: open,
        setOpen: setOpen,
        submit: submitHandler,
        message: "Are you sure you want to delete this product? All of the data will be permanently removed. This action cannot be undone.",
        title: "Delete product",
        success: "Delete"
    }

    const value = (column, row) => {
        switch (column.id) {
            case 'options':
                return (
                    <>
                        {/* <a onClick={() => props.changePage(row, 'edit-product')} className="normal-case mr-2 min-h-0 h-9 w-16 btn btn-ghost btn-sm rounded-btn bg-indigo-500 hover:bg-indigo-600 text-white">
                                                                Edit
                                                            </a> */}
                        <a onClick={() => props.changePage({page: 'view-product', product: row})}
                           className="normal-case mr-2 min-h-0 h-9 w-16 btn btn-ghost btn-sm rounded-btn bg-blue-500 hover:bg-blue-600 text-white">
                            View
                        </a>
                        <a onClick={() => {
                            setId(row._id);
                            setOpen(true);
                        }}
                           className="normal-case min-h-0 h-9 w-16 btn btn-ghost btn-sm rounded-btn bg-red-500 hover:bg-red-600 text-white">
                            Delete
                        </a>
                    </>
                )

            case 'is_active':
                return (
                    (row['is_active'] ?
                        <span
                            className="p-2 px-6 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            Active
                                                        </span> :
                        <span
                            className="p-2 px-4 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                            Not Active
                                                        </span>)
                )
            case 'visibility':
                return (
                    <input onChange={() => statusHandler(row._id)} type="checkbox"
                           checked={row['is_active'] ? "checked" : ""} className="toggle toggle-accent"/>
                )
            default:
                return (row[column.id])
        }
    }

    return (
        <div className="w-11/12">
            <div class="text-sm breadcrumbs mt-3">
                <ul>
                    <li>
                        <a onClick={() => props.changePage({page: 'dashboard'})}>Dashboard</a>
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
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </button>
                </div>
                <div class="flex-none hidden px-2 mx-2 lg:flex">
                    <div class="flex items-stretch">
                        <a className="btn btn-ghost btn-sm rounded-btn bg-green-300"
                           onClick={() => props.changePage({page: 'add-product'})}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                            </svg>
                            Add Product
                        </a>
                    </div>
                </div>
            </div>
            <DataTable columns={columns} filteredData={products} data={products} value={value}/>
            <DeleteModal {...val} />
        </div>
    )
}


