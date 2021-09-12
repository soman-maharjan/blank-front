import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import Footer from '../homepage/Footer';
import Navbar from '../homepage/Navbar'
import NotFound from '../NotFound';

export default function Shipping() {
    const products = useSelector(state => state.userCart.products);

    const dispatch = useDispatch();
    const history = useHistory();
    const userCart = useSelector(state => state.userCart);

    const [numberError, setNumberError] = useState(false);

    const [state, setState] = useState({
        first_name: "",
        last_name: "",
        company: "",
        address: "",
        apartment: "",
        zip_code: "",
        city: "",
        state: "",
        house_number: "",
        country: "",
        phone_number: "",
    });

    const [errors, setErrors] = useState({});

    const changeHandler = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        if (state.phone_number !== "") {
            if ((state.phone_number.startsWith(9)) && ((state.phone_number.length) === 10)) {
                setNumberError(false);
            } else {
                setNumberError(true);
            }
        }
    }, [state.phone_number]);

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch({ type: 'RESET_ADDRESS' });
        dispatch({ type: 'ADD_ADDRESS', address: state })

        axios.post('/api/order', { cart: userCart, address: state })
            .then(response =>
            (history.push
                ({
                    pathname: '/confirm-order',
                    state: response.data
                }),
                dispatch({ type: 'EMPTY_CART' })
            ))
            .catch(error => setErrors(error.response.data))
    }

    return products.length < 1 ?
        (
            <NotFound />
        )
        :
        (
            <>
                <Navbar />
                <div className="py-5 mb-10 mt-5">
                    <div className="max-w-xl mx-auto shadow-lg rounded-lg min-w-1/2">
                        <div className="md:flex">
                            <form className="w-full px-5 py-5">
                                <h2 className="text-3xl font-semibold">DELIVERY ADDRESS</h2>

                                <div className="flex flex-wrap -mx-3 mt-7 my-7">
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 font-medium mb-2" htmlFor="first_name">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <input type="text" onChange={changeHandler} className={` ${errors.first_name ? "border-red-500" : null} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} value={state.first_name} name="first_name" />
                                    </div>
                                    <div className="w-full md:w-1/2 px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 font-medium mb-2" htmlFor="last_name">
                                            Last Name <span className="text-red-500">*</span>
                                        </label>
                                        <input type="text" onChange={changeHandler} value={state.last_name} name="last_name" className={` ${errors.last_name ? "border-red-500" : null} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-2 my-7">
                                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 font-medium mb-2" htmlFor="company">
                                            Company
                                        </label>
                                        <input type="text" onChange={changeHandler} value={state.company} name="company" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                                    </div>
                                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 font-medium mb-2" htmlFor="address">
                                            Address <span className="text-red-500">*</span>
                                        </label>
                                        <input type="text" onChange={changeHandler} value={state.address} name="address" className={` ${errors.address ? "border-red-500" : null}  appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} />
                                    </div>
                                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 font-medium mb-2" htmlFor="apartment">
                                            Apartment
                                        </label>
                                        <input type="text" onChange={changeHandler} value={state.apartment} name="apartment" className=" appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-2 my-7">
                                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 font-medium mb-2" htmlFor="zip_code">
                                            Zip Code
                                        </label>
                                        <input type="text" onChange={changeHandler} value={state.zip_code} name="zip_code" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                                    </div>
                                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 font-medium mb-2" htmlFor="city">
                                            City <span className="text-red-500">*</span>
                                        </label>
                                        <input type="text" onChange={changeHandler} value={state.city} name="city" className={` ${errors.city ? "border-red-500" : null} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} />
                                    </div>
                                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 font-medium mb-2" htmlFor="state">
                                            State <span className="text-red-500">*</span>
                                        </label>
                                        <input type="text" onChange={changeHandler} value={state.state} name="state" className={` ${errors.state ? "border-red-500" : null} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-2 my-7">
                                    <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 font-medium mb-2" htmlFor="house_number">
                                            House Number
                                        </label>
                                        <input type="number" onChange={changeHandler} value={state.house_number} name="house_number" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                                    </div>
                                    <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 font-medium mb-2" htmlFor="country">
                                            Country <span className="text-red-500">*</span>
                                        </label>
                                        <input type="text" required onChange={changeHandler} value={state.country} name="country" className={` ${errors.country ? "border-red-500" : null} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-2 my-7">
                                    <div className="w-full px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 font-medium mb-2" htmlFor="phone_number">
                                            Phone Number <span className="text-red-500">*</span>
                                        </label>
                                        <input type="number" min="1" onChange={changeHandler} value={state.phone_number} name="phone_number" id="input-arrow" className={` ${errors.phone_number ? "border-red-500" : null} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} />
                                        {numberError ? <p className="text-red-500 text-xs italic">Enter a valid Number</p> : null}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-7">
                                    <Link to='/cart' className="btn btn h-12 w-40">Return to Cart</Link>
                                    <button onClick={submitHandler} type="submit" className="btn btn-success h-12 w-48 rounded border-green-500 bg-green-500 text-white">Proceed to Pay</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
}
