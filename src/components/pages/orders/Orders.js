import axios from 'axios'
import React, { Component } from 'react'
import Moment from 'react-moment';

class Orders extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orders: [],
        }
    }


    componentDidMount() {
        axios.get('/api/get-order')
            .then(response => this.setState({ orders: response.data }))
            .catch(error => console.log(error))
    }
    render() {
        return (
            <div className="w-11/12">
                <h1 className="text-2xl mb-10">Manage Orders</h1>
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
                                                Order Id
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Order Date
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Pending Since
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
                                                Payment Method
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Details
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {this.state.orders.map((order, index) => (
                                            <tr key={index}>
                                                <td className="max-w-xs px-6 py-4 min-w-sm whitespace-normal">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img className="h-10 w-10 rounded-full" src={`${process.env.REACT_APP_IMAGE_URL}${order.images[0]}`} alt="" />
                                                        </div>
                                                        <div className="ml-4 whitespace-normal">
                                                            <div className="text-sm break-all font-medium text-gray-900">{order.order_id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="max-w-xs px-1 py-4 min-w-1 whitespace-normal break-all">
                                                    <div className="text-sm text-gray-900"> <Moment format="YYYY/MM/DD">{order.created_at}</Moment> </div>
                                                </td>
                                                <td className="max-w-xs px-1 py-4 min-w-1 whitespace-normal break-all">
                                                    <Moment fromNow>{order.created_at}</Moment>
                                                </td>
                                                <td className="max-w-xs px-1 py-4 min-w-1 whitespace-normal break-all">
                                                    status
                                                </td>
                                                <td className="max-w-xs px-6 py-4 min-w-1 whitespace-normal break-all">
                                                    <div className="text-sm text-gray-900">{order.color}</div>
                                                </td>
                                                <td className="max-w-xs px-6 py-4 min-w-1 whitespace-normal break-all">
                                                    <div className="text-sm text-gray-900"><button className="btn btn-success bg-green-500 border-green-500 min-h-0 h-7" onClick={() => this.props.orderDetailsHandler(order, 'order-details')}>View</button></div>
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

export default Orders
