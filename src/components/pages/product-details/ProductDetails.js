import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import * as ActionTypes from '../../../redux/ActionTypes';
import Navbar from '../homepage/Navbar';

export default function ProductDetails(props) {

    const url = "api/product/" + props.id;

    const [product, setProduct] = useState({});

    const [state, setState] = useState({ product: {}, quantity: 1 })

    const [sku, setSku] = useState({});

    let history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setProduct(response.data)
                setState({ ...state, product: response.data })
                setSku(response.data.sku[0])
            })
            .catch(error => console.log(error))
    }, [])

    const changeHandler = (event) => {
        setState({
            ...state,
            quantity: event.target.value
        }
        )
    }

    const items = [];

    if (product.hasOwnProperty('_id')) {
        for (var key of Object.keys(product.attributes)) {
            items.push(<p> {key} : {product.attributes[key]} </p>)
        }
    }

    function cart() {
        // console.log(state);
        const val = { ...product, quantity: state.quantity, totalPrice: state.quantity * sku.price, sku: sku, price: sku.price }
        dispatch({ type: ActionTypes.ADD_TO_CART, product: val })
        history.push({
            pathname: '/cart',
            state: { product: state.product, quantity: state.quantity }
        });
    }

    const skuChangeHandler = (event) => {
        setSku(product.sku.filter(sku => sku.sellerSku == event.target.value)[0])
    }



    return (
        product.hasOwnProperty('_id') ?
            <>
                <Navbar />
                <div className="bg-gray-100 p-10 pt-0">
                    <div className="flex items-center p-5 lg:p-10 overflow-hidden relative">
                        <div className="w-full max-w-6xl rounded bg-white shadow-lg p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
                            <div className="md:flex items-center -mx-10">
                                <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                                    <div className="relative">
                                        <img src={`${process.env.REACT_APP_IMAGE_URL}${product.image}`} />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 px-10">
                                    <div className="mb-10">
                                        <h1 className="font-bold uppercase text-2xl mb-5 break-word">{product.productName}</h1>
                                        {/* <p className="text-sm">  <a href="#" className="opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900">MORE <i className="mdi mdi-arrow-right"></i></a></p> */}
                                        Brand : {product.attributes.Brand}
                                    </div>

                                    <div>
                                        <div className="inline-block align-bottom mr-5">
                                            <span className="text-2xl leading-none align-baseline">$</span>
                                            <span className="font-bold text-4xl leading-none align-baseline">{sku.price}</span>
                                        </div>

                                    </div>
                                    <br />
                                    <hr />
                                    <br />
                                    <div className="inline-block align-bottom mr-5 mb-10">
                                        <span className="leading-none align-baseline mr-10">{product.variation}</span>
                                        <select name="sku" className="" onChange={skuChangeHandler}>
                                            {product.sku.map((sku) =>
                                                <option value={sku.sellerSku}>{sku.value}</option>
                                            )}
                                        </select>
                                    </div>
                                    <br />
                                    <div className="inline-block align-bottom mr-5 mb-10">
                                        <span className="leading-none align-baseline mr-10">Quantity</span>
                                        <input value={state.quantity} onChange={changeHandler} type="number" min="1" className="border w-14 focus:outline-none" />
                                    </div>
                                    <div className="block align-bottom">
                                        <button onClick={cart} className="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold"><i class="mdi mdi-cart -ml-2 mr-2"></i>ADD TO CART</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" w-full max-w-6xl rounded bg-white shadow-lg p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
                        <div className="items-center">
                            Specification
                            <br /><br />
                            {items}
                        </div>
                        <hr className="my-4" />
                        <div className="items-center">
                            Product Details
                            <br /><br />
                            <div dangerouslySetInnerHTML={{ __html: product.description }} />
                        </div>
                    </div>
                </div>
            </>
            : null
    )
}
