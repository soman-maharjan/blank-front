import axios from 'axios'
import React, { Component } from 'react'

export default class ManageProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: []
        }
    }

    componentDidMount() {
        axios.get('api/user-product')
            .then(response => this.setState({ products: response.data }))
            .catch(error => console.log(error))
    }




    render() {
        return (
            <div className="w-11/12">
                <h1 className="text-2xl mb-10">Manage Products</h1>
                <div className="flex flex-col mt-2">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Product Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Category
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Color
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Price
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {this.state.products.map((product, index) => (
                                            <tr key={index}>
                                                <td className="max-w-xs px-6 py-4 min-w-sm whitespace-normal">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img className="h-10 w-10 rounded-full" src={`${process.env.REACT_APP_IMAGE_URL}${product.image}`} alt="" />
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
                                                    <div className="text-sm text-gray-900">{product.color}</div>
                                                </td>
                                                <td className="max-w-xs px-6 py-4 min-w-1 whitespace-normal break-all">
                                                    <div className="text-sm text-gray-900">{product.price}</div>
                                                </td>
                                                <td className="max-w-xs px-6 py-4 min-w-1 whitespace-normal break-all text-right text-sm font-medium">
                                                    <a onClick={() => this.props.changePage({ product }, 'edit-product')} className="text-indigo-600 hover:text-indigo-900">
                                                        Edit
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



            </div>
        )
    }
}

