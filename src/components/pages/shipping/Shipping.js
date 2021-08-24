import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
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
            .then(response => (history.push('/confirm-order')))
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
                <div className="py-5">
                    <div className="max-w-xl mx-auto shadow-lg rounded-lg min-w-1/2 mx-2">
                        <div className="md:flex">
                            <form className="w-full px-5 py-5">
                                <h2 className="text-3xl font-semibold">DELIVERY ADDRESS</h2>
                                <div className="grid md:grid-cols-2 md:gap-4 mt-5 mb-2">
                                    <input type="text" onChange={changeHandler} value={state.first_name} name="first_name" placeholder="First Name" className={` ${errors.first_name ? "border-red-500" : null} input input input-bordered`} />
                                    <input type="text" onChange={changeHandler} value={state.last_name} name="last_name" placeholder="Last Name" className={` ${errors.last_name ? "border-red-500" : null} input input input-bordered`} />
                                </div>
                                <input type="text" onChange={changeHandler} value={state.company} name="company" className="my-3 w-full input input input-bordered" placeholder="Company (optional)" />
                                <input type="text" onChange={changeHandler} value={state.address} name="address" className={` ${errors.first_name ? "border-red-500" : null} my-3 w-full input input input-bordered`} placeholder="Address*" />
                                <input type="text" onChange={changeHandler} value={state.apartment} name="apartment" className="my-3 w-full input input input-bordered" placeholder="Apartment, suite, etc. (optional)" />
                                <div className="grid md:grid-cols-3 md:gap-2">
                                    <input type="text" onChange={changeHandler} value={state.zip_code} name="zip_code" class="my-3 input input input-bordered" placeholder="Zipcode" />
                                    <input type="text" onChange={changeHandler} value={state.city} name="city" className={` ${errors.city ? "border-red-500" : null} my-3 input input input-bordered`} placeholder="City*" />
                                    <input type="text" onChange={changeHandler} value={state.state} name="state" className={` ${errors.state ? "border-red-500" : null} my-3 input input input-bordered`} placeholder="State*" />
                                </div>
                                <div className="grid md:grid-cols-2 md:gap-4">
                                    <input type="number" onChange={changeHandler} value={state.house_number} name="house_number" class="w-full my-3 input input input-bordered" placeholder="House Number" />
                                    <input type="text" required onChange={changeHandler} value={state.country} name="country" className={` ${errors.country ? "border-red-500" : null} my-3 input input input-bordered`} placeholder="Country*" />
                                </div>
                                <input type="number" onChange={changeHandler} value={state.phone_number} name="phone_number" class={` ${errors.phone_number ? "border-red-500" : null} my-3 w-full input input input-bordered`} placeholder="Phone Number*" />
                                {/* {errors.hasOwnProperty('phone_number') ? <div className="text-red-500 font-sm">{errors.phone_number}</div> : null} */}
                                {numberError ? <div className="text-red-500 font-sm">Enter a valid Number</div> : null}

                                <div className="flex justify-between items-center mt-5">
                                    <Link to='/cart' className="btn btn h-12 w-40">Return to Cart</Link>
                                    <button onClick={submitHandler} type="submit" className="btn btn-success h-12 w-48 rounded bg-green-500 text-white">Proceed to Pay</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
}
