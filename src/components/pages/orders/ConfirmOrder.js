import React from 'react'
import Navbar from '../homepage/Navbar'
import gif from '../../images/01.gif';
import NotFound from '../NotFound';
import Footer from '../homepage/Footer';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function ConfirmOrder(props) {
    const date = new Date().toLocaleDateString();
    const state = props.location.state;
    const dispatch = useDispatch();

    dispatch({ type: 'EMPTY_CART' })

    return state !== undefined ? (
        <>
            <Navbar />
            <h1 className="mt-10 text-3xl">Your order has been placed!</h1>
            <div className="justify-center flex">
                <img src={gif} alt="Delivery" className="w-1/4" />
            </div>
            <div className="flex justify-center mt-5">
                <div className="p-2 w-4/5 flex shadow">
                    <div className="w-1/3 justify-start pl-5 capitalize mb-5">
                        <h1 className="text-purple-500 font-semibold text-lg">Shipping Address</h1>
                        <p className="mt-5 text-left">{state.address.first_name} {state.address.last_name}</p>
                        <p className="text-left">{state.address.house_number} {state.address.address}, {state.address.zip_code}</p>
                        {state.address.apartment !== null ? <p className="text-left">Apartment: {state.address.apartment}</p> : null}
                        {state.address.company !== null ? <p className="text-left">Company: {state.address.company}</p> : null}
                        <p className="text-left">Phone Number: {state.address.phone_number}</p>
                        <p className="text-left">{state.address.city}, {state.address.state}, {state.address.country}</p>
                    </div>
                    <div className="w-1/3 border-l-2 pl-5">
                        <h1 className="text-purple-500 font-semibold text-lg">Billing Information</h1>
                        <p className="mt-5 text-left">Payment Method: {state.type}</p>
                        <p className="mt-5 text-left">Payment Method: {state.name}</p>
                    </div>
                    <div className="w-1/3 border-l-2 pl-5">
                        <h1 className="text-purple-500 font-semibold text-lg">Order Info</h1>
                        <p className="mt-5 text-left">Order number : {state.orderId}</p>
                        <p className="text-left">Order Date : {date}</p>
                        <p className="text-left">Order Total : Rs. {state.grandTotal}</p>
                    </div>
                </div>

            </div>
            <div className="flex justify-center my-5">
                <div className="mt-10 w-3/5">
                    <h1 className="text-purple-500 font-semibold text-lg">Items Shipped</h1>

                    <div className="flex mt-10 mb-5 bg-gray-100 -mx-8 p-2">
                        <h3 className="font-semibold text-gray-600 uppercase w-2/4">Product Details</h3>
                        <h3 className="font-semibold text-gray-600 uppercase w-1/4 text-center">Quantity</h3>
                        <h3 className="font-semibold text-gray-600 uppercase w-1/4 text-center">Total</h3>
                    </div>
                    {state.products.map(product => (
                        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5 border-b-2 ">
                            <div className="flex w-2/4">
                                <div className="w-20">
                                    <img className="h-24 w-20" src={`${process.env.REACT_APP_IMAGE_URL}${product.sku.images[0]}`} alt />
                                </div>
                                <div className="flex flex-col justify-between ml-2 flex-grow">
                                    <span className="font-bold text-sm">{product.productName}</span>
                                    <span className="text-red-500 text-xs">Brand : {product.attributes.Brand === undefined ? "No Brand" : product.attributes.Brand}</span>
                                </div>
                            </div>

                            <span className="text-center w-1/4 font-semibold text-sm">{product.quantity}</span>
                            <span className="text-center w-1/4 font-semibold text-sm">Rs. {product.totalPrice}</span>
                        </div>
                    ))}

                    <p className="text-right text-lg mt-3"><span className="font-semibold">Total :</span> Rs {state.grandTotal}</p>
                    <div className="justify-end flex my-5 -mx-7">
                        <Link to='/' className=" btn btn-success h-12 w-52 bg-green-500 text-white border-green-500">Continue Shopping</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    ) :
        <NotFound />
}
