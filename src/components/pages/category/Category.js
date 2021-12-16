import axios from 'axios';
import React, {useEffect, useState} from 'react'
import Footer from '../homepage/Footer';
import Navbar from '../homepage/Navbar';
import Loading from '../Loading';
import DisplayProduct from '../search/DisplayProduct';

export default function Category(props) {

    const [products, setProducts] = useState();

    const [filters, setFilters] = useState({min: "", max: "", rating: "0", sort: "Relevance"});

    const [nextPage, setNextPage] = useState("");

    useEffect(() => {
        submitHandler();
    }, [props.category])

    const submitHandler = () => {
        axios.post('api/category/product', {
            'value': props.category,
            ...filters
        })
            .then(response => {
                setProducts(response.data.data)
                setNextPage(response.data.next_page_url)
            })
            .catch(error => console.log(error.response))
    }

    return (
        products === undefined ?
            <Loading/>
            :
            <div className="bg-gray-100 h-full">
                <Navbar/>
                <DisplayProduct submitHandler={submitHandler} products={products} setProducts={setProducts}
                                value={props.category} filters={filters} setFilters={setFilters} nextPage={nextPage}
                                setNextPage={setNextPage}/>
                <Footer/>
            </div>
    )
}
