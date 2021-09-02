import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import DatePicker from 'react-datepicker';

export default function OrderDetails(props) {

    const order = props.order;

    const [visible, setVisibility] = useState(false);
    const [disable, setDisabled] = useState(true);


    // const items = [];

    // for (var key of Object.keys(order.attributes)) {
    //     items.push(
    //         <div>
    //             <label htmlFor={key} className="text-gray-500 capitalize">{key}</label>
    //             <p className="break-words">{order.attributes[key]}</p>
    //         </div>
    //     )
    // }

    const selectChangeHandler = (event) => {
        setDisabled(false);
        if (event.target.value === "readyToShip") {
            setVisibility(true);
        } else {
            setVisibility(false);
        }
    }

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
    }

    const d = new Date();

    d.setDate(d.getDate() + 2)

    const [date, setDate] = useState((d.toISOString().split('T')[0]));

    return (
        <>
            {/* <div class="text-sm breadcrumbs overflow-hidden left-0">
                <ul>
                   
                    <li>
                        <a>Documents</a>
                    </li>
                    <li>Add Document</li>
                </ul>
            </div> */}
            <div className="w-11/12 bg-white shadow-md mt-10  text-left p-5">
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
                <div className="grid grid-cols-1 mt-5 gap-4">
                    <div>
                        <label htmlFor="orderId" className="text-gray-500">Order Status</label>
                        <p className="break-words capitalize">{order.status}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 mt-5 gap-5">
                    <div>
                        <label htmlFor="boxContents" className="text-gray-500">Order Date</label>
                        <p className="break-words capitalize"><Moment format="YYYY/MM/DD">{order.created_at}</Moment></p>
                    </div>
                    {order.status === "pending" ? <div>
                        <label htmlFor="boxContents" className="text-gray-500">Pending Since</label>
                        <p className="break-words"><Moment fromNow>{order.created_at}</Moment></p>
                    </div> : null}


                </div>
                <div className="grid grid-cols-1 mt-5 gap-5">

                    <select name="" className="select select-bordered w-full max-w-xs" onChange={selectChangeHandler}>
                        <option value="pending">Pending</option>
                        <option value="readyToShip">Ready To Ship</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                    </select>
                </div>
                {visible ?
                    <form className=" px-5 py-5 mx-40">
                        <p className="text-center font-semibold text-xl mt-10">PICK UP INFORMATION</p>

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
                                <input type="number" onChange={changeHandler} value={state.phone_number} name="phone_number" className={` ${errors.phone_number ? "border-red-500" : null} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} />
                                {numberError ? <p className="text-red-500 text-xs italic">Enter a valid Number</p> : null}
                            </div>
                        </div>
                        <hr className="my-7" />
                        <div>
                            <label htmlFor="date" className="font-semibold">Order Pickup Date : </label>
                            <input value={date} name="date" onChange={(event) => setDate(event.target.value)} type="date" min={(d.toISOString().split('T')[0])} className="input input-bordered" />
                        </div>
                    </form>
                    :
                    null}
                <div className="flex justify-center mt-5">
                    <button onClick={submitHandler} className="btn btn-primary w-40" disabled={disable ? "disabled" : null}>Save</button>
                </div>
            </div>
        </>
    )
}
