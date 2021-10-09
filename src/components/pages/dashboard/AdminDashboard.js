import React, { Component, Profiler } from 'react';
import Users from '../admin/users/Users';
import DashboardDetails from './DashboardDetails';
import ManageAds from '../admin/ad/ManageAds';
import AddImage from '../admin/ad/AddImage';
import Category from '../admin/category/Category';
import AddCategory from '../admin/category/AddCategory';
import EditUser from '../admin/users/EditUser';
import { PresentationChartBarIcon, SpeakerphoneIcon, TemplateIcon, UserGroupIcon, ShoppingBagIcon, CreditCardIcon } from '@heroicons/react/outline';
import Payment from '../admin/payment/Payment';
import ShowPayment from '../admin/payment/ShowPayment';
import Product from '../admin/product/Product';
import ShowProduct from '../admin/product/ShowProduct';

class AdminDashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            page: 'dashboard',
            user: {},
            payment: {},
            product: {}
        }

        this.changePage = this.changePage.bind(this);
    }

    changePage({ page, user, payment, product }) {
        this.setState({ page: page, user: user, payment: payment, product: product })
    }

    render() {

        const components = {
            'dashboard': <DashboardDetails />,
            'show-users': <Users changePage={this.changePage} />,
            'edit-user': <EditUser changePage={this.changePage} user={this.state.user} />,
            'manage-ads': <ManageAds changePage={this.changePage} />,
            'add-image': <AddImage changePage={this.changePage} />,
            'category': <Category changePage={this.changePage} />,
            'add-category': <AddCategory changePage={this.changePage} />,
            'payments': <Payment changePage={this.changePage} />,
            'show-payment': <ShowPayment changePage={this.changePage} payment={this.state.payment} />,
            'products': <Product changePage={this.changePage} />,
            'view-product': <ShowProduct changePage={this.changePage} product={this.state.product} />
        }

        const Component = components[this.state.page]

        return (
            <div className="shadow drawer drawer-mobile h-52 min-h-screen">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="flex flex-col items-center drawer-content">
                    {/* <label htmlFor="my-drawer-2" className="mb-4 btn btn-primary drawer-button lg:hidden">open menu</label> */}
                    {/* <div className="hidden text-xs text-center lg:block">
                    </div> */}

                    {/* {this.state.page === 'dashboard' ? <DashboardDetails /> : null}
                    {this.state.page === 'show-users' ? <ShowUsers /> : null}
                    {this.state.page === 'manage-ads' ? <ManageAds changePage={this.changePage} /> : null}
                    {this.state.page === 'add-image' ? <AddImage changePage={this.changePage} /> : null}
                    {this.state.page === 'category' ? <Category changePage={this.changePage} /> : null}
                    {this.state.page === 'add-category' ? <AddCategory changePage={this.changePage} /> : null} */}
                    {Component}

                </div>
                <div className="drawer-side shadow-md">
                    <label htmlFor="my-drawer-2" className="drawer-overlay" />
                    <ul className="menu p-4 overflow-y-auto w-60 h-screen bg-neutral text-white">
                        <li className="p-0 text-xl">
                            <a className="active-bg bg-none" onClick={() => this.setState({ page: 'dashboard' })}><PresentationChartBarIcon className="h-5 w-5 mr-3" />  Dashboard</a>
                        </li>
                        <li className="hover:bg-white rounded hover:text-neutral">
                            <a className="active-bg" onClick={() => this.setState({ page: 'show-users' })}><UserGroupIcon className="h-5 w-5 mr-3" />Users</a>
                        </li>
                        <li className="hover:bg-white rounded hover:text-neutral">
                            <a className="active-bg" onClick={() => this.setState({ page: 'products' })}><ShoppingBagIcon className="h-5 w-5 mr-3" />Products</a>
                        </li>
                        <li className="hover:bg-white rounded hover:text-neutral">
                            <a className="active-bg" onClick={() => this.setState({ page: 'category' })}><TemplateIcon className="h-5 w-5 mr-3" />Category</a>
                        </li>
                        <li className="hover:bg-white rounded hover:text-neutral">
                            <a className="active-bg" onClick={() => this.setState({ page: 'payments' })}><CreditCardIcon className="h-5 w-5 mr-3" />Payments</a>
                        </li>
                        <li className="hover:bg-white rounded hover:text-neutral">
                            <a className="active-bg" onClick={() => this.setState({ page: 'manage-ads' })}><SpeakerphoneIcon className="h-5 w-5 mr-3" />Ads</a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default AdminDashboard