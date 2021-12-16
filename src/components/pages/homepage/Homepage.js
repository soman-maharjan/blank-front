import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import Carousel from './Carousel'
import ProductCarousel from './ProductCarousel'
import Footer from './Footer'
import Ad from './Ad'
import Loading from '../Loading';

export default function Homepage() {
    const [products, setProducts] = useState([]);

    const [productLoading, setProductLoading] = useState(false);

    useEffect(() => {
        axios.get('api/product')
            .then(response => {
                setProducts(response.data)
                setProductLoading(true);
            })
            .catch(error => console.log(error))
    }, [])

    return (
        productLoading ?
            < div className="overflow-hidden bg-gray-100" >
                {/* <img src="http://127.0.0.1:8000/storage/images/51adfb32-dd77-4625-b367-8c5437ae75f6.jpg" /> */}
                < Navbar />
                <Carousel />
                <ProductCarousel title="Electronics" />
                <ProductCarousel title="Trending Items" />
                <Ad />
                <ProductCarousel title="Mens Fashion" />
                <ProductCarousel title="Women Fashion" />
                <Footer />
            </div >
            : <Loading />
    )
}




