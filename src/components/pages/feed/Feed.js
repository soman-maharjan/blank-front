import React, { useEffect, useState } from 'react'
import Footer from '../homepage/Footer';
import Navbar from '../homepage/Navbar';
import Loading from '../Loading';
import ProductFeed from './ProductFeed';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Echo from 'laravel-echo';

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

    // window.Pusher.logToConsole = true;

    const details = useSelector(state => state.userDetails.userProfile);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/feed')
            .then(response => console.log(response))
            .catch(error => console.log(error.response))

        window.Echo.private(`products.` + details._id)
            .listen('NewProduct', (e) => {
                // console.log(e)
                setProducts((prevState) => ([...prevState, e.product]));
            });

        return () => {
            window.Echo.leave(`products.` + details._id);
        }
    }, [])

    return (
        loading ? <Loading /> :
            < div className="overflow-hidden bg-gray-100" >
                < Navbar />
                {/* <ProductFeed products={products} /> */}
                <div className="h-screen">
                    {products != undefined ? products.map(p => <h1>{p._id}</h1>) : "No Products"}
                </div>
                <Footer />
            </div >

    )
}
