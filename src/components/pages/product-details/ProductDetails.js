import {HeartIcon as Icon, StarIcon} from '@heroicons/react/solid';
import {HeartIcon} from '@heroicons/react/outline';
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import * as ActionTypes from '../../../redux/ActionTypes';
import Navbar from '../homepage/Navbar';
import Image from './Image';
import {LoadProfileAction} from '../../../redux/actions/ProfileAction';
import Reviews from './Reviews';

export default function ProductDetails(props) {

    const url = "api/product/" + props.id;

    const profile = useSelector(state => state.userDetails.userProfile);

    const [product, setProduct] = useState({});

    const [state, setState] = useState({product: {}, quantity: 1})

    const [sku, setSku] = useState({});

    const [user, setUser] = useState();

    let history = useHistory();

    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setProduct(response.data)
                setState({...state, product: response.data})
                setSku(response.data.sku[0])
                axios.get('/api/users/username/' + response.data.user_id)
                    .then(response => setUser(response.data))
                    .catch(error => console.log(error.response))
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

    const follow = () => {
        axios.post('api/follow', {id: product.user_id})
            .then(response => {
                console.log(response)
                dispatch(LoadProfileAction());
            })
            .catch(error => console.log(error.response))
    }

    const unfollow = () => {
        axios.post('api/unfollow', {id: product.user_id})
            .then(response => {
                console.log(response)
                dispatch(LoadProfileAction());
            })
            .catch(error => console.log(error.response))
    }

    const items = [];
    var images = [];

    if (product.hasOwnProperty('_id')) {
        for (var key of Object.keys(product.attributes)) {
            items.push(<div>
                <p className="text-gray-500">{key}</p>
                <p>{product.attributes[key]}</p>
            </div>)
        }

        images = product.sku.map(sku => (sku.images)).flat(2);
        // setImage(images[0]);
    }

    function cart() {
        const val = {
            ...product,
            quantity: state.quantity,
            totalPrice: state.quantity * sku.price,
            sku: sku,
            price: sku.price
        }
        dispatch({type: ActionTypes.ADD_TO_CART, product: val})
        history.push({
            pathname: '/cart',
            state: {product: state.product, quantity: state.quantity}
        });
    }

    const skuChangeHandler = (event) => {
        setSku(product.sku.filter(sku => sku.sellerSku == event.target.value)[0])
    }

    return (
        product.hasOwnProperty('_id') ?
            <>
                <Navbar/>
                <div className="bg-gray-100 p-10 pt-0">
                    <div className="overflow-hidden relative">
                        <div class="text-sm breadcrumbs my-3 ">
                            <ul>
                                <li>Home</li>
                                <li>{product.category}</li>
                                <li>{product.productName}</li>
                            </ul>
                        </div>
                        <div
                            className="w-full rounded bg-white shadow-md mb-10 p-10 lg:p-10 mx-auto text-gray-800 relative md:text-left">
                            <div className="md:flex -mx-10">
                                <div className="w-full md:w-2/4 px-12 mb-10 md:mb-0">
                                    <Image images={images}/>
                                </div>
                                <div className="w-full md:w-1/4 pt-20 px-10">
                                    <div className="mb-10">
                                        <h1 className="font-bold uppercase text-3xl mb-5 break-word">{product.productName}</h1>
                                        {/* <p className="text-sm">  <a href="#" className="opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900">MORE <i className="mdi mdi-arrow-right"></i></a></p> */}
                                        Brand : {product.attributes.Brand}
                                    </div>
                                    <div>
                                        <div className="inline-block align-bottom mr-5">
                                            <span className="text-2xl leading-none align-baseline">Rs. </span>
                                            <span
                                                className="font-bold text-4xl leading-none align-baseline">{sku.price}</span>
                                        </div>
                                    </div>
                                    <br/>
                                    <hr/>
                                    <br/>
                                    <div className="inline-block align-bottom mr-5 mb-10">
                                        <span className="leading-none align-baseline mr-10">{product.variation}</span>
                                        <select name="sku" className="select select-bordered select-sm w-28"
                                                onChange={skuChangeHandler}>
                                            {product.sku.map((sku) =>
                                                <option value={sku.sellerSku}>{sku.value}</option>
                                            )}
                                        </select>
                                    </div>
                                    <br/>
                                    <div className="inline-block align-bottom mr-5 mb-10">
                                        <span className="leading-none align-baseline mr-10">Quantity</span>
                                        <input min="1" value={state.quantity} onChange={changeHandler} type="number"
                                               className="border w-14 focus:outline-none"/>
                                    </div>
                                    <div className="block align-bottom">
                                        <button onClick={cart}
                                                className="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900  rounded-full px-10 py-2 font-semibold">
                                            <i class="mdi mdi-cart -ml-2 mr-2"></i>ADD TO CART
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/4 px-4 mb-10 md:mb-0 relative p-5">
                                    <div className="border border-gray-300 mt-80 w-full">
                                        <h1 className="pl-3 pt-2 font-bold text-lg">Seller Information</h1>
                                        <p className="pl-3 pt-2 text-sm">{user} (5021 <StarIcon
                                            className="h-5 w-5 inline" fill="#FF9529"/>)</p>
                                        <p className="pl-3 pt-2 text-sm">96% Positive Feedback</p>
                                        <hr className="mt-2 mb-1"/>
                                        {
                                            profile._id !== product.user_id ?

                                                (profile.following.includes(product.user_id) ?
                                                        <p className="pl-3 text-sm cursor-pointer"
                                                           onClick={unfollow}>Following <Icon
                                                            className="h-5 w-5 inline text-indigo-800"/></p> :
                                                        <p className="pl-3 text-sm cursor-pointer"
                                                           onClick={follow}>Follow this seller <HeartIcon
                                                            className="h-5 w-5 inline text-indigo-800"/></p>
                                                ) :
                                                null}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex">
                        <div className="w-3/4">
                            <div
                                className="mb-4 w-full rounded bg-white shadow-md p-5 pl-10 mx-auto text-gray-800 relative md:text-left">
                                <div className="items-center">
                                    <h6 className="text-lg font-semibold leading-normal mt-0 mb-2">Product details
                                        of {product.productName}</h6>
                                    <div dangerouslySetInnerHTML={{__html: product.description}}/>
                                </div>
                                <hr className="my-2"/>
                                <div className="items-center">
                                    <h6 className="text-lg font-semibold leading-normal mt-0 mb-2">Specification
                                        of {product.productName}</h6>
                                    <div className="grid grid-cols-2 gap-4">
                                        {items}
                                    </div>
                                </div>
                            </div>
                            <Reviews productId={product._id}/>
                        </div>
                        <div className="w-1/4">
                            hello
                        </div>
                    </div>

                </div>
            </>
            : null
    )
}
