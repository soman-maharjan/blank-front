import React, { Component } from 'react';
import DashboardDetails from '../dashboard/DashboardDetails';
import ManageAccount from './profile/ManageAccount';
import DisplayOrders from './orders/DisplayOrders';

import { PresentationChartBarIcon, UserGroupIcon, ClipboardListIcon, ShoppingBagIcon, PencilAltIcon } from '@heroicons/react/outline';
import { UserIcon } from '@heroicons/react/solid';
import Order from './orders/Order';
import ManageReview from './reviews/ManageReview'

class UserDashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            page: 'dashboard',
            user: {},
            payment: {},
            product: {},
            order: {}
        }

        this.changePage = this.changePage.bind(this);
    }

    changePage({ page, user, payment, product, order }) {
        this.setState({ page: page, user: user, payment: payment, product: product, order: order })
    }

    render() {

        const components = {
            'dashboard': <DashboardDetails />,
            'manage-account': <ManageAccount />,
            'display-order': <DisplayOrders changePage={this.changePage} />,
            'view-order': <Order order={this.state.order} />,
            'reviews': <ManageReview />
        }

        const Component = components[this.state.page]

        return (
            <div className="shadow drawer drawer-mobile h-52 min-h-screen">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="flex flex-col items-center drawer-content bg-gray-100">
                    {Component}
                </div>
                <div className="drawer-side shadow-md">
                    <label htmlFor="my-drawer-2" className="drawer-overlay" />
                    <ul className="menu p-4 overflow-y-auto w-60 h-screen bg-neutral text-white">
                        <li className="p-0 text-xl">
                            <a className="active-bg bg-none" onClick={() => this.setState({ page: 'dashboard' })}><PresentationChartBarIcon className="h-5 w-5 mr-3" />  Dashboard</a>
                        </li>
                        <li className="hover:bg-white rounded hover:text-neutral">
                            <a className="active-bg" onClick={() => this.setState({ page: 'manage-account' })}><UserIcon className="h-5 w-5 mr-3" />Profile</a>
                        </li>
                        <li className="hover:bg-white rounded hover:text-neutral">
                            <a className="active-bg" onClick={() => this.setState({ page: 'display-order' })}><ClipboardListIcon className="h-5 w-5 mr-3" />Your Orders</a>
                        </li>
                        <li className="hover:bg-white rounded hover:text-neutral">
                            <a className="active-bg" onClick={() => this.setState({ page: 'reviews' })}><PencilAltIcon className="h-5 w-5 mr-3" />Reviews</a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default UserDashboard