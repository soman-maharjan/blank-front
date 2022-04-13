import React, { Component } from 'react';
import ManageAccount from '../user/profile/ManageAccount';
import DisplayOrders from '../user/orders/DisplayOrders';

import { PresentationChartBarIcon, ClipboardListIcon, PencilAltIcon } from '@heroicons/react/outline';
import { UserIcon } from '@heroicons/react/solid';
import Order from '../user/orders/Order';
import ManageReview from '../user/reviews/ManageReview'
import Review from '../user/reviews/Review';
import UserDashboardDetails from "./UserDashboardDetails";

class UserDashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            page: 'dashboard',
            user: {},
            payment: {},
            product: {},
            order: {},
            review: {}
        }

        this.changePage = this.changePage.bind(this);
    }

    changePage({ page, user, payment, product, order, review }) {
        this.setState({ page: page, user: user, payment: payment, product: product, order: order, review: review })
    }

    render() {

        const components = {
            'dashboard': <UserDashboardDetails />,
            'manage-account': <ManageAccount />,
            'display-order': <DisplayOrders changePage={this.changePage} />,
            'view-order': <Order order={this.state.order} changePage={this.changePage}/>,
            'reviews': <ManageReview changePage={this.changePage} />,
            'review': <Review changePage={this.changePage} review={this.state.review} />
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