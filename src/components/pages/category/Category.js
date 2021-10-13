import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Footer from '../homepage/Footer';
import Navbar from '../homepage/Navbar';
import Loading from '../Loading';
import DisplayProduct from '../search/DisplayProduct';

export default function Category(props) {

    const [products, setProducts] = useState();

    const [filters, setFilters] = useState({ min: "", max: "", rating: "0" });

    useEffect(() => {
        submitHandler();
    }, [props.word])

    const submitHandler = () => {
        axios.post('api/category/product', {
            'value': props.category,
            ...filters
        })
            .then(response => {
                setProducts(response.data)
            })
            .catch(error => console.log(error.response))
    }

    return (
        products === undefined ?
            <Loading />
            :
            <div className="bg-gray-100 h-full">
                <Navbar />
                <DisplayProduct submitHandler={submitHandler} products={products} setProducts={setProducts} filters={filters} setFilters={setFilters} />
                <Footer />
            </div >
    )
}
