import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import * as ActionTypes from '../../../redux/ActionTypes';
import Navbar from '../homepage/Navbar';

export default function ShoppingCart(props) {
    const products = useSelector(state => state.userCart.products);

    const [total, setTotal] = useState(0);

    let sum = 0;

    const dispatch = useDispatch();
    const history = useHistory();
    const quantityValue = React.createRef();


    // function changeQuantity(event, id) {
    //     // setValues(values.map(val => (val._id === id ?
    //     //     { ...val, quantity: event.target.value, totalPrice: (event.target.value) * val.price }
    //     //     : { ...val, totalPrice: val.quantity * val.price })))

    //     dispatch({ type: ActionTypes.ADD_QUANTITY, id: id, quantity: event.target.value })
    // }

    function increaseQuantity(id) {
        if (quantityValue.current !== null) {
            dispatch({ type: ActionTypes.ADD_QUANTITY, id: id, quantity: parseInt(quantityValue.current.value, 10) + 1 })
        }
    }

    function decreaseQuantity(id) {
        if (quantityValue.current !== null) {
            dispatch({ type: ActionTypes.SUB_QUANTITY, id: id, quantity: parseInt(quantityValue.current.value, 10) - 1 })
        }
    }

    useEffect(() => {
        if (products !== null) {
            for (let i = 0; i < products.length; i++) {
                sum += products[i].totalPrice;
            }
            setTotal(sum)
        }
    }, [products])

    useEffect(() => {
        dispatch({ type: ActionTypes.ADD_TOTAL, total: total })
    }, [total])


    function continueShopping() {
        history.push({
            pathname: '/home'
        });
    }

    function removeItem(id) {
        dispatch({ type: ActionTypes.REMOVE_FROM_CART, id: id })
    }

    // history.push({
    //     pathname: '/home',
    //     state: { product: state.product, quantity: state.quantity }
    // });

    // useEffect(() => {
    //     dispatch({ type: ActionTypes.UPDATE_CART, product: values, total: sum })
    // }, [values])

    const details = products !== null ? products.map(product => (
        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
            <div className="flex w-2/5">
                <div className="w-20">
                    <img className="h-24" src={`${process.env.REACT_APP_IMAGE_URL}${product.image}`} alt />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{product.productName}</span>
                    <span className="text-red-500 text-xs">Brand : {product.attributes.Brand === undefined ? "No Brand" : product.attributes.Brand}</span>
                    <a onClick={() => removeItem(product._id)} className="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a>
                </div>
            </div>
            <div className="flex justify-center w-1/5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => increaseQuantity(product._id)}>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <input id="input-arrow" min="1" ref={quantityValue} className="mx-2 border text-center w-14 focus:outline-none" type="number" name="quantity" value={product.quantity} />
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => decreaseQuantity(product._id)}>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
                </svg>
            </div>
            <span className="text-center w-1/5 font-semibold text-sm">Rs. {product.price}</span>
            <span className="text-center w-1/5 font-semibold text-sm">Rs. {product.totalPrice}</span>
        </div>
    )) : null

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-10">
                <div className="flex shadow-md my-10">
                    <div className="w-3/4 bg-white px-10 py-10">
                        <div className="flex justify-between border-b pb-8">
                            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                            <h2 className="font-semibold text-2xl">{products.length} Items</h2>
                        </div>
                        <div className="flex mt-10 mb-5">
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
                            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
                            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
                        </div>
                        {details.length === 0 ? "Shopping Cart is Empty!" : null}
                        {details}
                        <a onClick={continueShopping} className="flex font-semibold text-indigo-600 text-sm mt-10">
                            <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
                                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                            Continue Shopping
                        </a>
                    </div>
                    <div id="summary" className="w-1/4 px-8 py-10">
                        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                        <div className="flex justify-between mt-10 mb-5">
                            <span className="font-semibold text-sm uppercase">Items {products.length}</span>
                            <span className="font-semibold text-sm">Rs. {total}</span>
                        </div>
                        <div>
                            <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                            <select className="block p-2 text-gray-600 w-full text-sm">
                                <option>--- Shipping ---</option>
                            </select>
                        </div>
                        <div className="py-10">
                            <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
                            <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
                        </div>
                        <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
                        <div className="border-t mt-8">
                            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                <span>Total cost</span>
                                <span>Rs. {total}</span>
                            </div>
                            <Link to='/shipping' className="btn btn-success h-12 w-52 bg-green-500 text-white" disabled={products.length < 1 ? true : false}>Checkout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
