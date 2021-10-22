import axios from 'axios'
import React, { Component } from 'react'
import Moment from 'react-moment';
import Fuse from 'fuse.js'

var fuse;

class ShowOrder extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orders: [],
            filteredData: [],
            search: "",
        }
    }

    flattenObj(obj, parent, res = {}) {
        for (let key in obj) {
            let propName = parent ? parent + '.' + key : key;
            if (typeof obj[key] == 'object') {
                this.flattenObj(obj[key], propName, res);
            } else {
                res[propName] = obj[key];
            }
        }
        return res;
    }

    initializeFuse = () => {
        if (this.state.orders != []) {
            const options = {
                includeScore: true,
                keys: Object.keys(this.flattenObj(this.state.orders[0]))
            }

            console.log(Object.keys(this.flattenObj(this.state.orders[0])))

            fuse = new Fuse(this.state.orders, options)
        }
    }

    componentDidMount() {
        axios.get('/api/user-order')
            .then(response => {
                console.log(response)
                this.setState({ ...this.state, filteredData: response.data, orders: response.data }, (this.initializeFuse))
            })
            .catch(error => console.log(error.response))

    }

    searchHandler = (event) => {
        if (event.target.value != "") {
            this.setState({ ...this.state, search: event.target.data, filteredData: fuse.search(event.target.value).map(o => o.item) })
        } else {
            this.setState({ ...this.state, search: event.target.data, filteredData: this.state.orders })
        }
    }

    render() {
        return (
            <div className="w-11/12">
                <div class="text-sm breadcrumbs mt-3">
                    <ul>
                        <li>
                            <a onClick={() => this.props.changePage({}, 'dashboard')}>Dashboard</a>
                        </li>
                        <li>Orders</li>
                    </ul>
                </div>
                {/* <h1 className="text-2xl mb-10">Manage Products</h1> */}
                <div class="navbar shadow mt-3 mb-5">
                    <div class="flex-1 px-2 mx-2">
                        <span class="text-lg font-semibold">
                            Orders
                        </span>
                    </div>

                    <div class="flex-none">
                        <input type="text" className="w-40 min-h-0 h-7 bg-white border-2" value={this.state.search} onChange={(event) => this.searchHandler(event)} />
                        <button class="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col mt-2">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block sm:px-6 lg:px-8 min-w-full">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="divide-y divide-gray-200 min-w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Order Id
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Order Date
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Pending Since
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Details
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 min-w-full">
                                        {this.state.orders.length < 1 ?
                                            <tr>
                                                <td colspan="6" className="px-6 py-4 min-w-sm whitespace-normal">
                                                    No data available in table
                                                </td>
                                            </tr>
                                            :
                                            this.state.filteredData.map((order, index) => (
                                                <tr key={index}>
                                                    <td className="max-w-xs px-6 py-4 min-w-sm whitespace-normal">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <img className="h-10 w-10 rounded-full" src={`${process.env.REACT_APP_IMAGE_URL}${order.sku.images[0]}`} alt="" />
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
                                                        {order.status == "pending" ? <Moment fromNow>{order.created_at}</Moment> : "-"}
                                                    </td>
                                                    <td className="max-w-xs px-1 py-4 min-w-1 whitespace-normal break-all capitalize">
                                                        {order.status}
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

export default ShowOrder
