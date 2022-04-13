import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PaymentDetailTable from './PaymentDetailTable';

export default function Product(props) {
    const { payment } = props;

    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState({});
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        Promise.all([axios.get('api/users/' + payment.user_id), axios.get('api/sub-order/' + payment.order_id)])
            .then(function (results) {
                setUser(results[0].data)
                setOrders(results[1].data)
            });
    }, [])

    return (
        <>
            <div class="text-sm breadcrumbs mt-3 overflow-visible w-full text-left pl-14">
                <ul>
                    <li>
                        <a onClick={() => props.changePage({ page: 'dashboard' })}>Dashboard</a>
                    </li>
                    <li>Payment</li>
                </ul>
            </div>
            <div className="w-11/12 bg-white shadow-md mt-5 text-left p-5">
                <div className="grid grid-cols-1 mb-5">
                    <p className="font-semibold text-xl mt-5">PAYMENT INFORMATION</p>
                    <p className="text-gray-500 text-md">Information about payment</p>
                </div>
                <hr />
                <div className="grid grid-cols-1 mt-5 gap-4">
                    <div className="grid grid-cols-2 mt-2 gap-5">

                        <div>
                            <label htmlFor="productId" className="text-gray-500">Payment Id</label>
                            <p className="break-words">{payment._id}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 mt-2 gap-5">
                        <div>
                            <label htmlFor="productName" className="text-gray-500">Order Id</label>
                            <p className="break-words capitalize">{payment.order_id}</p>
                        </div>
                        <div>
                            <label htmlFor="category" className="text-gray-500">Buyer Id</label>
                            <p className="break-words capitalize">{payment.user_id}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="variation" className="text-gray-500 capitalize">Type</label>
                            <p className="break-words capitalize">{payment.type}</p>
                        </div>
                        <div>
                            <label htmlFor="price" className="text-gray-500">Name</label>
                            <p className="break-words capitalize">{payment.name}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-11/12 bg-white mt-10 text-left">
                <div className="grid grid-cols-1">
                    <p className="font-semibold text-xl p-5">Order Details</p>
                    <hr/>
                    <PaymentDetailTable orders={orders} payment={payment} />
                </div>
            </div>

            <div className="w-11/12 bg-white shadow-md mt-10 text-left px-5 mb-10">
                <div className="grid grid-cols-1 mb-5">
                    <p className="font-semibold text-xl my-5">Buyer Details</p>
                    <hr/>
                    <div className="pt-5 grid grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="productName" className="text-gray-500">Name</label>
                            <p className="break-words capitalize">{user.name}</p>
                        </div>
                        <div>
                            <label htmlFor="category" className="text-gray-500">Email</label>
                            <p className="break-words capitalize">{user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

