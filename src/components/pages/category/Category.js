import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DisplayProduct from '../search/DisplayProduct';

export default function Category(props) {

    const [products, setProducts] = useState();
    const [filteredData, setFilteredData] = useState();

    useEffect(() => {
        axios.get(`/api/category/product/` + props.category)
            .then(response => {
                console.log(response)

                setProducts(response.data)
                setFilteredData(response.data)
            })
            .catch(error => console.log(error.response))
    }, [props.category])

    return (
        <div>
            <DisplayProduct products={products} setProduct={setProducts} filteredData={filteredData} setFilteredData={setFilteredData} />
        </div>
    )
}
