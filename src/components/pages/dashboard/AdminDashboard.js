import React, { Component } from 'react'
import ShowUsers from '../admin/users/ShowUsers'
import DashboardDetails from './DashboardDetails'

class AdminDashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            page: 'dashboard',
        }

    }

    render() {
        return (
            <div className="rounded-lg shadow drawer drawer-mobile h-52 min-h-screen">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="flex flex-col items-center drawer-content">
                    {/* <label htmlFor="my-drawer-2" className="mb-4 btn btn-primary drawer-button lg:hidden">open menu</label> */}
                    {/* <div className="hidden text-xs text-center lg:block">
                    </div> */}
                    {this.state.page === 'dashboard' ? <DashboardDetails /> : null}
                    {this.state.page === 'show-users' ? <ShowUsers /> : null}


                </div>
                <div className="drawer-side shadow-md">
                    <label htmlFor="my-drawer-2" className="drawer-overlay" />
                    {this.state.page}
                    <ul className="menu p-4 overflow-y-auto w-60 bg-base-100 text-base-content">
                        <label className="mb-3 cursor-pointer" onClick={() => this.setState({ page: 'dashboard' })}>Dashboard</label>
                        <li>
                            <a onClick={() => this.setState({ page: 'show-users' })}>Users</a>
                        </li>
                        <li>
                            <a onClick={() => this.setState({ page: 'manage-product' })}>Manage Products</a>
                        </li>
                        <li>
                            <a onClick={() => this.setState({ page: 'orders' })}>Orders</a>
                        </li>
                        <li>
                            <a onClick={() => this.setState({ page: 'profile' })}>Profile</a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default AdminDashboard