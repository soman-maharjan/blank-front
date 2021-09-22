import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import OrderAddressForm from './OrderAddressForm';
import Loading from '../Loading';

export default function OrderDetails(props) {
    const order = props.order;

    const [visible, setVisibility] = useState(false);
    const [disable, setDisabled] = useState(true);
    const [address, setAddress] = useState({});
    const [loading, setLoading] = useState(false);

    const selectChangeHandler = (event) => {
        setDisabled(false);
        if (event.target.value === "readyToShip") {
            setVisibility(true);
        } else {
            setVisibility(false);
        }
    }

    useEffect(() => {
        if (order.status == 'Ready To Ship') {
            setLoading(true)
            axios.get(`/api/pickup-address/${order._id}`)
                .then(response => {
                    setLoading(false)
                    setAddress(response.data)
                })
                .catch(error => console.log(error.response))
        }
    }, [order.status])

    return loading ? <Loading /> : (
        <>
            <div class="text-sm breadcrumbs mt-3 overflow-visible w-full text-left pl-14">
                <ul>
                    <li>
                        <a onClick={() => props.changePage({}, 'dashboard')}>Dashboard</a>
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

                {order.status == 'pending' ?
                    <>
                        <div className="grid grid-cols-1 mt-5 gap-5">

                            <select name="" className="w-full p-2 outline-none rounded max-w-xs border-2 border-gray-400" onChange={selectChangeHandler}>
                                <option value="pending">Pending</option>
                                <option value="readyToShip">Ready To Ship</option>
                            </select>
                        </div>
                        <OrderAddressForm visible={visible} disable={disable} orderId={order._id} orderDetailsHandler={props.orderDetailsHandler} />
                    </> : null
                }
            </div>
            {order.status != 'pending' ?
                <div className="w-11/12 bg-white shadow-md  text-left p-5 mb-10">
                    <div className="mb-5 flex">
                        <p className="font-semibold text-xl mt-5">PICK-UP ADDRESS  (Pick-up Date : {address.pickup_date})</p>
                    </div>
                    <hr />
                    <div class="grid grid-cols-2 gap-4 mt-3">
                        <div className="mt-2">
                            <label className="text-gray-500">First Name</label>
                            <p className="break-words capitalize">{address.first_name}</p>
                        </div>
                        <div className="mt-2">
                            <label className="text-gray-500">Last Name</label>
                            <p className="break-words capitalize">{address.last_name}</p>
                        </div>
                        <div className="mt-2">
                            <label className="text-gray-500">Phone Number</label>
                            <p className="break-words capitalize">{address.phone_number}</p>
                        </div>
                        <div className="mt-2">
                            <label className="text-gray-500">Company</label>
                            <p className="break-words capitalize">{address.company ? address.company : "-"}</p>
                        </div>
                        <div className="mt-2">
                            <label className="text-gray-500">Address</label>
                            <p className="break-words capitalize">{address.address}</p>
                        </div>
                        <div className="mt-2">
                            <label className="text-gray-500">Apartment</label>
                            <p className="break-words capitalize">{address.apartment ? address.apartment : "-"}</p>
                        </div>
                        <div className="mt-2">
                            <label className="text-gray-500">Zip Code</label>
                            <p className="break-words capitalize">{address.zip_code ? address.zip_code : "-"}</p>
                        </div>
                        <div className="mt-2">
                            <label className="text-gray-500">City</label>
                            <p className="break-words capitalize">{address.city}</p>
                        </div>
                        <div className="mt-2">
                            <label className="text-gray-500">State</label>
                            <p className="break-words capitalize">{address.state}</p>
                        </div>
                        <div className="mt-2">
                            <label className="text-gray-500">House Number</label>
                            <p className="break-words capitalize">{address.house_number}</p>
                        </div>
                        <div className="mt-2">
                            <label className="text-gray-500">Country</label>
                            <p className="break-words capitalize">{address.country}</p>
                        </div>
                        <div className="mt-2">
                            <label className="text-gray-500">Note</label>
                            <p className="break-words capitalize">{address.note ? address.note : "-"}</p>
                        </div>
                    </div>
                </div> :
                null}
        </>
    )
}
