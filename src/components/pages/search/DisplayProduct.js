import React, { useEffect, useState } from 'react'
import ProductCard from '../homepage/ProductCard';

import { ChevronRightIcon } from '@heroicons/react/solid'
import { FormControl, NativeSelect, Rating } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

export default function DisplayProduct(props) {

    const { submitHandler, products, setProducts, filters, setFilters, value } = props;

    const [reset, setReset] = useState(true);

    const resetFilter = () => {
        setFilters({
            ...filters,
            max: "",
            min: "",
            rating: "0",
            sort: "Relevance"
        })

        setReset(!reset);
    }

    useEffect(() => {
        submitHandler();
    }, [filters.rating, props.word, reset, filters.sort])

    var data = [];

    for (let x = 5; x > 0; x--) {
        data.push(<div className="flex cursor-pointer" onClick={() => setFilters({ ...filters, rating: x })}><Rating name="read-only" value={x} readOnly /></div>)
    }

    const fetchData = () => {
        axios.post(props.nextPage, {
            'value': value,
            ...filters
        })
            .then(response => {
                console.log(response)
                setProducts([...products, ...response.data.data])
                props.setNextPage(response.data.next_page_url)
            })
            .catch(error => console.log(error.response))
    }

    return (
        <div className="flex mt-3 bg-grey-100">
            <div className="px-2 border-r-2 w-1/6">
                <button className="min-h-0 h-10 btn bg-indigo-600 hover:bg-indigo-700 border-none text-white rounded mb-4 px-10" onClick={resetFilter}>Reset</button>
                <div className="border-b-2 pb-5 block">
                    <h2 className="font-semibold">Price Range</h2>
                    <input onChange={(event) => setFilters({ ...filters, min: event.target.value })} value={filters.min} type="number" min="0" name="min" className="mt-2 w-20 h-8 border-2 border-gray-300 outline-none focus:border-indigo-600 mr-2 p-3 rounded-lg" />
                    <input onChange={(event) => setFilters({ ...filters, max: event.target.value })} value={filters.max} type="number" min="0" name="max" className="mt-2 w-20 h-8 border-2 border-gray-300 outline-none focus:border-indigo-600 mr-2 p-3 rounded-lg" />
                    <button className="ml-2 bg-indigo-500 hover:bg-indigo-700  rounded p-1 transform translate-y-1" onClick={submitHandler}><ChevronRightIcon className="h-5 w-5 text-white" /></button>
                </div>
                <h2 className="font-semibold mt-4">Rating</h2>
                <div className="flex justify-center border-b-2 pb-5">
                    <div>
                        {data}
                    </div>
                </div>

                <div className="flex justify-center border-b-2 pb-5">
                    <div>
                        <FormControl>
                            <h2 className="font-semibold mt-4">Sort By</h2>
                            <NativeSelect onChange={(event) => setFilters({ ...filters, sort: event.target.value })}>
                                <option value="Relevance">Relevance</option>
                                <option value="Newest Arrivals">Newest Arrivals</option>
                                <option value="Price: Low to High">Price: Low to High</option>
                                <option value="Price: Hight to Low">Price: Hight to Low</option>
                                <option value="Name: A to Z">Name: A to Z</option>
                                <option value="Name: Z to A">Name: Z to A</option>
                            </NativeSelect>
                        </FormControl>
                    </div>
                </div>

            </div>

            <div className="w-5/6">
                <InfiniteScroll
                    dataLength={products.length}
                    next={fetchData}
                    hasMore={props.nextPage == null ? false : true}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <h1>
                            <b>Yay! You have seen it all</b>
                        </h1>
                    }
                >
                    <div className="grid grid-cols-6 px-10 bg-gray-100 pb-10">
                        {products.map((product, index) => <ProductCard key={index} product={product} />)}
                    </div>
                </InfiniteScroll>
            </div>
        </div>

    )
}
