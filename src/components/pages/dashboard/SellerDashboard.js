import React, { Component } from 'react'
import AddProduct from '../product/AddProduct'
import ManageProduct from '../product/ManageProduct'
import DashboardDetails from './DashboardDetails'
import EditProduct from '../product/EditProduct'
import Orders from '../orders/Orders'
import OrderDetails from '../orders/OrderDetails'
import Profile from '../profile/Profile'

class SellerDashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            page: 'dashboard',
            product: {},
            order: {}
        }

        this.changePage = this.changePage.bind(this)
        this.orderDetailsHandler = this.orderDetailsHandler.bind(this)
    }

    changePage(product, page) {
        this.setState({ ...this.state, product: product, page: page })
    }

    orderDetailsHandler(order, page) {
        this.setState({ ...this.state, order: order, page: page })
    }

    render() {
        return (
            <div className="shadow bg-base-200 drawer drawer-mobile h-52 min-h-screen">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="flex flex-col items-center drawer-content">
                    {/* <label htmlFor="my-drawer-2" className="mb-4 btn btn-primary drawer-button lg:hidden">open menu</label> */}
                    {/* <div className="hidden text-xs text-center lg:block">
                    </div> */}
                    {this.state.page === 'dashboard' ? <DashboardDetails /> : null}

                    {this.state.page === 'add-product' ? <AddProduct /> : null}
                    {this.state.page === 'manage-product' ? <ManageProduct changePage={this.changePage} /> : null}
                    {this.state.page === 'edit-product' ? <EditProduct product={this.state.product} /> : null}
                    {this.state.page === 'orders' ? <Orders orderDetailsHandler={this.orderDetailsHandler} /> : null}
                    {this.state.page === 'order-details' ? <OrderDetails order={this.state.order} changePage={this.changePage}/> : null}


                    {this.state.page === 'profile' ? <Profile /> : null}
                    {/* <div className="text-xs text-center lg:hidden">Menu can be toggled on mobile size.
                        <br />Resize the browser to see fixed sidebar on desktop size
                    </div> */}
                </div>
                <div className="drawer-side shadow-md ">
                    <label htmlFor="my-drawer-2" className="drawer-overlay" />
                    <ul className="menu p-4 overflow-y-auto w-60 h-screen bg-neutral text-white">
                        <label className="mb-3 cursor-pointer" onClick={() => this.setState({ page: 'dashboard' })}>Dashboard</label>
                        <li className="hover:bg-white rounded hover:text-neutral">
                            <a className="active-bg" onClick={() => this.setState({ page: 'manage-product' })}>Products</a>
                        </li>
                        <li className="hover:bg-white rounded hover:text-neutral">
                            <a className="active-bg" onClick={() => this.setState({ page: 'orders' })}>Orders</a>
                        </li>
                        <li className="hover:bg-white rounded hover:text-neutral">
                            <a className="active-bg" onClick={() => this.setState({ page: 'profile' })}>My Account</a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default SellerDashboard
