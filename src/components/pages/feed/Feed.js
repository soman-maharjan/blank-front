import React, { useEffect, useState } from 'react'
import Footer from '../homepage/Footer';
import Navbar from '../homepage/Navbar';
import Loading from '../Loading';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Echo from 'laravel-echo';
import ProductBox from './ProductBox';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: "8d6a5d587c3aaffa2ffb",
    cluster: "ap2",
    forceTLS: true,
    encrypted: true,
    authorizer: (channel, options) => {
        return {
            authorize: (socketId, callback) => {
                axios.post('/api/broadcasting/auth', {
                    socket_id: socketId,
                    channel_name: channel.name
                })
                    .then(response => {
                        callback(false, response.data);
                    })
                    .catch(error => {
                        callback(true, error);
                    });
            }
        };
    },
});

export default function Feed() {

    window.Pusher.logToConsole = true;

    const details = useSelector(state => state.userDetails.userProfile);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        setLoading(true);
        axios.get('/api/feed')
            .then(response => {
                setProducts(response.data)
                setLoading(false);
            })
            .catch(error => {
                setError(error.response.data.message)
                setLoading(false);
            })

        window.Echo.private(`products.` + details._id)
            .listen('NewProduct', (e) => {
                // console.log(e)
                setProducts((prevState) => ([e.product,...prevState]));
            });

        return () => {
            window.Echo.leave(`products.` + details._id);
        }
    }, [])

    const productList = error ? "No Products Found" : products.map(p => <ProductBox product={p} />);
    console.log(products);
    return (
        <div className="overflow-hidden" >
            < Navbar />
            {loading ? <Loading /> :
                <div className="min-h-screen">
                    <div className="grid grid-cols-4">
                        <div className="grid grid-cols-3 col-span-3 gap-4">
                            {productList}
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            }
            <Footer />
        </div >

    )
}
