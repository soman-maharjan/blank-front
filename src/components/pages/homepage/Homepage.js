import React, {useEffect} from 'react'
import Navbar from './Navbar'
import Carousel from './Carousel'
import ProductCarousel from './ProductCarousel'
import Footer from './Footer'
import Ad from './Ad'

export default function Homepage() {
    return (
        // productLoading ?
        < div className="overflow-hidden bg-gray-100">
            < Navbar/>
            <div className="min-h-screen">
            <Carousel/>
            <ProductCarousel url="/api/category/product/Electronics" title="Electronics"/>
            <ProductCarousel url="/api/product/top-selling" title="Top Selling"/>
            <Ad/>
            <ProductCarousel url="/api/category/product/Mens Fashion" title="Mens Fashion"/>
            <ProductCarousel url="/api/category/product/Womens Fashion" title="Women Fashion"/>
            </div>
            <Footer/>
        </div>
        // : <Loading />
    )
}




