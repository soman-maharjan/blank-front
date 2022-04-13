import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import Loading from '../../Loading';

export default function Order(props) {
    const order = props.order;
    const [loading, setLoading] = useState(false);

    return loading ? <Loading /> : (
        <>
            <div class="text-sm breadcrumbs mt-3 overflow-visible w-full text-left pl-14">
                <ul>
                    <li>
                        <a onClick={() => props.changePage({page: 'dashboard'})}>Dashboard</a>
                    </li>
                    <li>Orders</li>
                </ul>
            </div>
            <div className="w-11/12 bg-white shadow-md mt-5 text-left p-5">
                <div className="grid grid-cols-1 mb-5">
                    <p className="font-semibold text-xl mt-5">ORDER INFORMATION</p>
                    <p className="text-gray-500 text-md">Information about order</p>
                </div>
                <hr />
                <div className="grid grid-cols-1 mt-5 gap-4">
                    <div className="grid grid-cols-2 mt-2 gap-5">

                        <div>
                            <label htmlFor="orderId" className="text-gray-500">Order Id</label>
                            <p className="break-words">{order._id}</p>
                        </div>
                        <div>
                            <label htmlFor="sellerSku" className="text-gray-500">SKU</label>
                            <p className="break-words capitalize">{order.sku.sellerSku}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 mt-2 gap-5">
                        <div>
                            <label htmlFor="productName" className="text-gray-500">Product Name</label>
                            <p className="break-words capitalize">{order.productName}</p>
                        </div>
                        <div>
                            <label htmlFor="category" className="text-gray-500">Category</label>
                            <p className="break-words capitalize">{order.category}</p>
                        </div>
                    </div>

                    {/* <p className="font-semibold text-md mt-4">Product Attributes</p>

                    <div className="grid grid-cols-3 gap-5">
                        {items}
                    </div> */}

                    {/* <p className="font-semibold text-md mt-4">Product Details</p> */}

                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="variation" className="text-gray-500 capitalize">{order.variation}</label>
                            <p className="break-words capitalize">{order.sku.value}</p>
                        </div>
                        <div>
                            <label htmlFor="price" className="text-gray-500">Price</label>
                            <p className="break-words">Rs. {order.sku.price}</p>
                        </div>

                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="boxContents" className="text-gray-500">Box Contents</label>
                            <p className="break-words capitalize">{order.boxContents}</p>
                        </div>
                        <div>
                            <label htmlFor="boxContents" className="text-gray-500">Quantity</label>
                            <p className="break-words">{order.quantity}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-11/12 bg-white shadow-md mt-10 text-left p-5 mb-10">
                <div className="grid grid-cols-1 mb-5">
                    <p className="font-semibold text-xl mt-5">STATUS</p>
                </div>
                <hr />
                <div className="grid grid-cols-2 mt-5 gap-4">
                    <div>
                        <label htmlFor="orderId" className="text-gray-500">Order Status</label>
                        <p className="break-words capitalize">{order.status}</p>
                    </div>
                    <div>
                        <label htmlFor="boxContents" className="text-gray-500">Order Date</label>
                        <p className="break-words capitalize"><Moment format="YYYY/MM/DD">{order.created_at}</Moment></p>
                    </div>
                </div>
                <div className="grid grid-cols-1 mt-5 gap-5">
                    {order.status === "pending" ? <div>
                        <label htmlFor="boxContents" className="text-gray-500">Pending Since</label>
                        <p className="break-words"><Moment fromNow>{order.created_at}</Moment></p>
                    </div> : null}
                </div>
            </div>

        </>
    )
}
