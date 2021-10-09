import React, { useState } from 'react'
import Footer from '../homepage/Footer';
import Navbar from '../homepage/Navbar';
import Loading from '../Loading';
import ProductFeed from './ProductFeed';

export default function Feed() {
    const [loading, setLoading] = useState(false);
    return (
        loading ? <Loading /> :
            < div className="overflow-hidden bg-gray-100" >
                < Navbar />
                <ProductFeed />
                <Footer />
            </div >

    )
}
