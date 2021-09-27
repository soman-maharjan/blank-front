import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Footer from '../homepage/Footer';
import Navbar from '../homepage/Navbar';
import ProductCard from '../homepage/ProductCard';
import Loading from '../Loading';

// import { TreeView, TreeItem } from '@mui/lab'
import { ChevronRightIcon, ChevronDownIcon, StarIcon } from '@heroicons/react/solid'
// import { TextField } from '@mui/material';

function DisplayProduct(props) {

    const { products, setProducts, filteredData, setFilteredData } = props;

    const [filters, setFilters] = useState({ min: "", max: "", rating: "", category: "" });

    const changeHandler = (event) => {
        setFilters({
            ...filters,
            [event.target.name]: event.target.value
        })
    }

    const filterHandler = () => {
        var fil = "";
        fil = fil.concat(filters.min != "" ? "parseFloat(p.sku[0].price) >= filters.min " : "true")
        fil = fil.concat(filters.max != "" ? " && parseFloat(p.sku[0].price) <= filters.max" : " && true")
        fil = fil.concat(filters.rating != "" ? " && p.rating >= filters.rating" : " && true")
        // fil = fil.concat(filters.category != "" ? " && p.category == filters.category" : " && true")

        if (products != undefined) {
            setFilteredData(products.filter(p => eval(fil)))
        }
    }

    const resetFilter = () => {
        setFilters({
            ...filters,
            max: "",
            min: "",
            rating: "",
            // category: ""
        })
        setFilteredData(products);
    }

    useEffect(() => {
        filterHandler()
    }, [filters.rating])

    var data = [];

    for (let x = 5; x > 0; x--) {
        var icon = [];
        for (let y = 0; y < x; y++) {
            icon.push(<StarIcon className="h-5 w-5" fill="#FF9529" />)
        }
        data.push(<div className="flex cursor-pointer" onClick={() => setFilters({ ...filters, rating: x })}>{icon}</div>)
    }

    return (
        filteredData === undefined ?
            <Loading />
            :
            <div className="bg-gray-100 h-screen">
                <Navbar />
                <div className="flex my-10 bg-grey-100">
                    <div className="w-1/6 border-r-2 h-80">
                        <button className="min-h-0 h-10 btn bg-indigo-600 hover:bg-indigo-700 border-none text-white rounded mb-4 px-10" onClick={resetFilter}>Reset</button>
                        <div className="border-b-2 pb-5">
                            <h2 className="font-semibold">Price Range</h2>
                            <input onChange={changeHandler} value={filters.min} type="number" min="0" name="min" className="mt-2 w-20 h-8 border-2 border-gray-300 outline-none focus:border-indigo-600 mr-2 p-3 rounded-lg" />
                            <input onChange={changeHandler} value={filters.max} type="number" min="0" name="max" className="mt-2 w-20 h-8 border-2 border-gray-300 outline-none focus:border-indigo-600 mr-2 p-3 rounded-lg" />
                            <button className="ml-2 bg-indigo-500 hover:bg-indigo-700  rounded p-1 transform translate-y-1" onClick={filterHandler}><ChevronRightIcon className="h-5 w-5 text-white" /></button>
                        </div>
                        <h2 className="font-semibold mt-4">Rating</h2>
                        <div className="flex justify-center">
                            <div>
                                {data}
                            </div>
                        </div>

                        {/* <h2 className="font-semibold mt-4 mb-2">Category</h2>
                        <TreeView
                            aria-label="file system navigator"
                            defaultCollapseIcon={<ChevronDownIcon />}
                            defaultExpandIcon={<ChevronRightIcon />}
                            sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                        >
                            {categories.map((c, index) => {
                                if (c.parent == null) {
                                    return <>
                                        <TreeItem label={c.title} nodeId={index}>
                                            {categories.map((x, index) => x.parent == c.title ? <TreeItem onClick={() => console.log(x.title)} nodeId={index} label={x.title} /> : null)}
                                        </TreeItem>
                                    </>
                                }
                            }
                            )}
                        </TreeView> */}

                    </div>
                    <div className="w-5/6 grid grid-cols-6 px-10 bg-gray-100">
                        {filteredData.length < 1 ? <h3>0 results found</h3> : filteredData.map((product, index) => <ProductCard key={index} product={product} />)}
                    </div>
                </div>
                <Footer />
            </div>
    )
}

export default React.memo(DisplayProduct);
