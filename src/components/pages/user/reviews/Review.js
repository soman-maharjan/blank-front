import { Rating } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from '../../Loading';

export default function Review(props) {
    const { review } = props;

    const [suborder, setSuborder] = useState({})

    useEffect(() => {
        axios.get('api/suborder/' + review.suborder_id)
            .then(response => setSuborder(response.data))
            .catch(error => console.log(error.response))
    }, [])
    return suborder.sku == undefined ? <Loading /> : (
        <div className="w-11/12">
            <div class="text-sm breadcrumbs mt-3">
                <ul>
                    <li>
                        <a onClick={() => this.props.changePage({}, 'dashboard')}>Dashboard</a>
                    </li>
                    <li>Your Review</li>
                </ul>
            </div>
            {/* <h1 className="text-2xl mb-10">Manage Products</h1> */}
            {/* <div class="navbar shadow mt-3 mb-5 bg-white">
                <div class="flex-1 px-2 mx-2">
                    <span class="text-lg font-semibold">
                        Your Review
                    </span>
                </div>
            </div> */}

            <div className="w-11/12 bg-white shadow-md mt-5 text-left p-5">
                <div className="grid grid-cols-1 mb-5">
                    <p className="font-semibold text-xl mt-5">Your Review</p>
                </div>
                <hr />
                <div className="grid grid-cols-1 mt-5 gap-4">
                    <div className="grid grid-cols-2 mt-2 gap-5">

                        <div>
                            <label htmlFor="productId" className="text-gray-500">Review Id</label>
                            <p className="break-words">{review._id}</p>
                        </div>
                        <div>
                            <label htmlFor="productName" className="text-gray-500">SubOrder Id</label>
                            <p className="break-words capitalize">{review.suborder_id}</p>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 gap-5">
                        <div>
                            <label htmlFor="variation" className="text-gray-500 capitalize">Your Review</label>
                            <p className="break-words capitalize">{review.review}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="boxContents" className="text-gray-500">Rating</label>
                            <p><Rating value={review.rating} readOnly /></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-11/12 bg-white shadow-md mt-10 text-left p-5 mb-10">
                <div className="grid grid-cols-1 mb-5">
                    <p className="font-semibold text-xl mt-5">Images</p>
                </div>
                <hr />
                <div className="justify-center flex flex-wrap p-5 gap-4">
                    {review !== undefined ? review.images.map(i => <img src={`${process.env.REACT_APP_IMAGE_URL}${i}`} className="w-60" />) : null}
                </div>
            </div>

            <div className="w-11/12 bg-white shadow-md mt-10 text-left p-5 mb-10">
                <div className="grid grid-cols-1 mb-5">
                    <p className="font-semibold text-xl mt-5">Product Details</p>
                </div>
                <hr />
                <div className="grid grid-cols-1 mt-5 gap-4">
                    <div className="grid grid-cols-1 gap-5">
                        <div>
                            <label className="text-gray-500">Product Name</label>
                            <p>{suborder.productName}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-5">
                        <div>
                            <label className="text-gray-500">Variation</label>
                            <p>{suborder.sku.value}</p>
                        </div>
                        <div>
                            <label className="text-gray-500">Quantity</label>
                            <p>{suborder.quantity}</p>
                        </div>
                        <div>
                            <label className="text-gray-500">Total Price</label>
                            <p>Rs. {suborder.totalPrice}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



