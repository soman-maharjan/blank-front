import React, { Component } from 'react';
import ShowUsers from '../admin/users/ShowUsers';
import DashboardDetails from './DashboardDetails';
import ManageAds from '../admin/ad/ManageAds';
import AddImage from '../admin/ad/AddImage';

class AdminDashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            page: 'dashboard',
        }

        this.changePage = this.changePage.bind(this);
    }

    changePage(page) {
        this.setState({ page: page })
    }

    render() {
        return (
            <div className="shadow drawer drawer-mobile h-52 min-h-screen">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="flex flex-col items-center drawer-content">
                    {/* <label htmlFor="my-drawer-2" className="mb-4 btn btn-primary drawer-button lg:hidden">open menu</label> */}
                    {/* <div className="hidden text-xs text-center lg:block">
                    </div> */}
                    {this.state.page === 'dashboard' ? <DashboardDetails /> : null}
                    {this.state.page === 'show-users' ? <ShowUsers /> : null}
                    {this.state.page === 'manage-ads' ? <ManageAds changePage={this.changePage} /> : null}
                    {this.state.page === 'add-image' ? <AddImage changePage={this.changePage} /> : null}


                </div>
                <div className="drawer-side shadow-md">
                    <label htmlFor="my-drawer-2" className="drawer-overlay" />
                    <ul className="menu p-4 overflow-y-auto w-60 h-screen bg-neutral text-white">
                        <label className="mb-3 cursor-pointer" onClick={() => this.setState({ page: 'dashboard' })}>Dashboard</label>
                        <li className="hover:bg-white rounded hover:text-neutral">
                            <a className="active-bg" onClick={() => this.setState({ page: 'show-users' })}>Users</a>
                        </li>
                        <li className="hover:bg-white rounded hover:text-neutral">
                            <a className="active-bg" onClick={() => this.setState({ page: 'manage-ads' })}>Ads</a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default AdminDashboard