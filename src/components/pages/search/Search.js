import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DisplayProduct from './DisplayProduct';

export default function Search(props) {

    const [products, setProducts] = useState();
    const [filteredData, setFilteredData] = useState();

    useEffect(() => {
        const url = 'api/search/' + props.word;
        axios.get(url)
            .then(response => {
                setProducts(response.data)
                setFilteredData(response.data)
            })
            .catch(error => console.log(error))
    }, [props.word])

    return (
        <div>
            <DisplayProduct products={products} setProduct={setProducts} filteredData={filteredData} setFilteredData={setFilteredData} />
        </div>
    )
}
