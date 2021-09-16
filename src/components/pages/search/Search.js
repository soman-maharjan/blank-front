import { ChevronRightIcon, StarIcon } from '@heroicons/react/solid';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../homepage/Navbar';
import ProductCard from '../homepage/ProductCard';
import Loading from '../Loading';

function Search(props) {

    const [products, setProducts] = useState();
    const [fliteredData, setFliteredData] = useState();

    const [state, setState] = useState({ min: 0, max: 0, rating: 5 });

    useEffect(() => {
        const url = 'api/search/' + props.word;
        axios.get(url)
            .then(response => {
                setProducts(response.data)
                console.log(response.data)
                setFliteredData(response.data)
            })
            .catch(error => console.log(error))
    }, [props.word])

    const changeHandler = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const priceRangeHandler = () => {
        if (products.length > 0) {
            setFliteredData(products.filter(p => (parseFloat(p.sku[0].price) >= state.min && parseFloat(p.sku[0].price) <= state.max)))
        }
    }

    return (
        fliteredData === undefined ?
            <Loading />
            :
            <div className="bg-gray-100 h-screen">
                <Navbar />
                <div className="flex my-10 bg-grey-100">
                    <div className="w-1/6 border-r-2 h-80">
                        <div className="border-b-2 pb-5">
                            <h2 className="font-semibold">Price Range</h2>
                            <input onChange={changeHandler} value={state.min} type="number" min="0" name="min" className="mt-2 w-20 h-8 border-0.5 border-black mr-2 input" />
                            <input onChange={changeHandler} value={state.max} type="number" min="0" name="max" className="w-20 h-8 border-0.5 border-black input" />
                            <button className="ml-2 bg-green-300 rounded p-1 transform translate-y-1" onClick={priceRangeHandler}><ChevronRightIcon className="h-5 w-5" /></button>
                        </div>
                        <h2 className="font-semibold mt-4">Rating</h2>
                        <div className="flex justify-center">
                            <div>
                                <div className="flex">
                                    <StarIcon className="h-5 w-5" fill="#FF9529" />
                                    <StarIcon className="h-5 w-5" fill="#FF9529" />
                                    <StarIcon className="h-5 w-5" fill="#FF9529" />
                                    <StarIcon className="h-5 w-5" fill="#FF9529" />
                                    <StarIcon className="h-5 w-5" fill="#FF9529" />

                                </div>
                                <div className="flex">
                                    <StarIcon className="h-5 w-5" fill="#FF9529" />
                                    <StarIcon className="h-5 w-5" fill="#FF9529" />
                                    <StarIcon className="h-5 w-5" fill="#FF9529" />
                                    <StarIcon className="h-5 w-5" fill="#FF9529" />

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="w-5/6 grid grid-cols-6 px-10 bg-gray-100">
                        {fliteredData.length < 1 ? <h3>1 results found</h3> : fliteredData.map((product, index) => <ProductCard key={index} product={product} />)}
                    </div>
                </div>
            </div>


    )
}

export default React.memo(Search);
