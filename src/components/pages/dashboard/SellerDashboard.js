import React, { Component } from 'react'
import AddProduct from '../product/AddProduct'
import ManageProduct from '../product/ManageProduct'
import SellerDashboardDetails from './SellerDashboardDetails'
import EditProduct from '../product/EditProduct'
import Orders from '../orders/Orders'
import OrderDetails from '../orders/OrderDetails'
import Product from '../product/Product'
import {ChatAltIcon, ClipboardListIcon, PencilAltIcon, ShoppingBagIcon} from '@heroicons/react/outline'
import Comments from "../comment/Comments";
import ShowComment from "../comment/ShowComment";
import Reviews from "../review/Reviews";
import Review from "../user/reviews/Review";

class SellerDashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            page: 'dashboard',
            product: {},
            order: {},
            comment: {},
            review: {}
        }

        this.changePage = this.changePage.bind(this)
        this.orderDetailsHandler = this.orderDetailsHandler.bind(this)
    }

    changePage({ product, page, order, comment, review }) {
        this.setState({ ...this.state, product: product, page: page, order: order, comment: comment, review: review})
    }

    orderDetailsHandler(order, page) {
        this.setState({ ...this.state, order: order, page: page })
    }

    render() {

        const components = {
            'dashboard': <SellerDashboardDetails />,
            'add-product': <AddProduct changePage={this.changePage}/>,
            'manage-product': <ManageProduct changePage={this.changePage} />,
            'edit-product': <EditProduct product={this.state.product} />,
            'orders': <Orders orderDetailsHandler={this.orderDetailsHandler} changePage={this.changePage} />,
            'order-details': <OrderDetails order={this.state.order} changePage={this.changePage} orderDetailsHandler={this.orderDetailsHandler} />,
            'view-product': <Product product={this.state.product} />,
            'comments': <Comments changePage={this.changePage} />,
            'reviews': <Reviews changePage={this.changePage} />,
            'review': <Review changePage={this.changePage} review={this.state.review} />,
            'show-comment': <ShowComment changePage={this.changePage} comment={this.state.comment}/>
        };

        const Component = components[this.state.page];

        return (
            <div className="shadow drawer drawer-mobile h-52 min-h-screen bg-gray-100">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="flex flex-col items-center drawer-content">
                    {Component}
                </div>
                <div className="drawer-side shadow-md ">
                    <label htmlFor="my-drawer-2" className="drawer-overlay" />
                    <ul className="menu p-4 overflow-y-auto w-60 h-screen bg-neutral text-white">
                        <label className="mb-3 cursor-pointer" onClick={() => this.setState({ page: 'dashboard' })}>Dashboard</label>
                        <li className="hover:bg-white rounded hover:text-neutral">
                            <a className="active-bg" onClick={() => this.setState({ page: 'manage-product' })}><ShoppingBagIcon className="h-5 w-5 mr-3" />Products</a>
                        </li>
                        <li className="hover:bg-white rounded hover:text-neutral">
                            <a className="active-bg" onClick={() => this.setState({ page: 'orders' })}><ClipboardListIcon className="h-5 w-5 mr-3" />Orders</a>
                        </li>
                        <li className="hover:bg-white rounded hover:text-neutral">
                            <a className="active-bg" onClick={() => this.setState({ page: 'comments' })}><ChatAltIcon className="h-5 w-5 mr-3" />Comments</a>
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

export default SellerDashboard
