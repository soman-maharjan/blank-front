import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import Carousel from './Carousel'
import ProductCarousel from './ProductCarousel'
import Footer from './Footer'
import Ad from './Ad'

export default function Homepage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('api/product')
            .then(response => setProducts(response.data))
            .catch(error => console.log(error))
    }, [])

    return (
        <div className="overflow-hidden bg-gray-100">
            {/* <img src="http://127.0.0.1:8000/storage/images/51adfb32-dd77-4625-b367-8c5437ae75f6.jpg" /> */}
            <Navbar />
            <Carousel />
            <ProductCarousel title="Electronics" products={products}/>
            <ProductCarousel title="Trending Items" products={products}/>
            <Ad />
            <ProductCarousel title="Mens Fashion" products={products}/>
            <ProductCarousel title="Women Fashion" products={products}/>
            <Footer />
        </div>
    )
}




