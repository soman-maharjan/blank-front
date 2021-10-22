import React from 'react'
import KhaltiCheckout from "khalti-checkout-web";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Navbar from '../../pages/homepage/Navbar'
import Footer from '../../pages/homepage/Footer'
import { useHistory } from 'react-router';

export default function Payment(props) {

    const state = props.location.state;

    const history = useHistory();

    const cart = useSelector(state => state.userCart)
    const products = cart.products;

    const productName = products.map(p => p.productName)
    const productIdentity = products.map(p => p._id)
    const productUrl = products.map(i => process.env.REACT_APP_URL + 'product/' + i._id)

    let config = {
        // replace this key with yours
        "publicKey": process.env.REACT_APP_KHALTI_PUBLIC_KEY,
        "productIdentity": productIdentity.toString(),
        "productName": productName.toString(),
        "productUrl": productUrl.toString(),
        "eventHandler": {
            onSuccess(payload) {
                // hit merchant api for initiating verfication
                axios.post('api/handle-payment', { ...payload, type: "KHALTI", cart: cart, orderId: state.orderId })
                    .then(response =>
                        history.push
                            ({
                                pathname: '/confirm-order',
                                state: state,
                                paymentResponse: response.data
                            })
                    )
                    .catch(error => (
                        alert("Something went Wrong , Try Again !!")
                    ))
            },
            // onError handler is optional
            onError(error) {
                // handle errors
                console.log(error);
            },
            onClose() {
                console.log('widget is closing');
            }
        },
        "paymentPreference": ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
    };

    const checkout = new KhaltiCheckout(config);

    function payment() {
        checkout.show({ amount: (cart.total) });
    }

    return (
        <>
            <Navbar />
            <div className="h-screen pt-5">
                <h3 className="text-lg">Select payment method</h3>
                <button onClick={payment} id="khalti-button">Pay with Khalti</button>
            </div>
            <Footer />
        </>
    )
}




