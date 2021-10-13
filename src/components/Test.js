// import axios from 'axios';
// import React, { Component } from 'react'
// import Footer from './pages/homepage/Footer';
// import Navbar from './pages/homepage/Navbar';
// import ProductCard from './pages/homepage/ProductCard';
// import Loading from './pages/Loading';

// import { ChevronRightIcon, StarIcon } from '@heroicons/react/solid'

// export class Test extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             products: {},
//             filters: { min: "", max: "", rating: "0" }
//         }
//     }


//     render() {
//         var data = [];

//         for (let x = 5; x > 0; x--) {
//             var icon = [];
//             for (let y = 0; y < x; y++) {
//                 icon.push(<StarIcon className="h-5 w-5" fill="#FF9529" />)
//             }
//             data.push(<div className="flex cursor-pointer" onClick={() => this.setState({ ...this.state.products, filters: { ...this.state.filters, rating: x } })
//             }> {icon}</div >)
//         }

//         const resetFilter = () => {
//             this.setState({
//                 ...this.state.products, filters: {
//                     ...this.state.filters,
//                     max: "",
//                     min: "",
//                     rating: "0"
//                 }
//             })

//             submitHandler();
//         }

//         useEffect(() => {
//             submitHandler();
//         }, [filters.rating, props.word])

//         const submitHandler = () => {

//             console.log(filters);
//             axios.post('api/search', {
//                 'value': props.word,
//                 ...filters
//             })
//                 .then(response => {
//                     console.log(response)
//                     setProducts(response.data)
//                 })
//                 .catch(error => console.log(error.response))
//         }
//         return (
//             products === undefined ?
//                 <Loading />
//                 :
//                 <div className="bg-gray-100 h-full">
//                     <Navbar />
//                     <h1 className="mt-3 text-right px-10">Sort by</h1>
//                     <div className="flex mt-3 bg-grey-100">
//                         <div className="w-1/6 border-r-2 h-80">
//                             <button className="min-h-0 h-10 btn bg-indigo-600 hover:bg-indigo-700 border-none text-white rounded mb-4 px-10" onClick={resetFilter}>Reset</button>
//                             <div className="border-b-2 pb-5">
//                                 <h2 className="font-semibold">Price Range</h2>
//                                 <input onChange={(event) => setFilters({ ...filters, min: event.target.value })} value={filters.min} type="number" min="0" name="min" className="mt-2 w-20 h-8 border-2 border-gray-300 outline-none focus:border-indigo-600 mr-2 p-3 rounded-lg" />
//                                 <input onChange={(event) => setFilters({ ...filters, max: event.target.value })} value={filters.max} type="number" min="0" name="max" className="mt-2 w-20 h-8 border-2 border-gray-300 outline-none focus:border-indigo-600 mr-2 p-3 rounded-lg" />
//                                 <button className="ml-2 bg-indigo-500 hover:bg-indigo-700  rounded p-1 transform translate-y-1" onClick={submitHandler}><ChevronRightIcon className="h-5 w-5 text-white" /></button>
//                             </div>
//                             <h2 className="font-semibold mt-4">Rating</h2>
//                             <div className="flex justify-center">
//                                 <div>
//                                     {data}
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="w-5/6 grid grid-cols-6 px-10 bg-gray-100 pb-10">
//                             {products.length < 1 ? <h3>0 results found</h3> : products.map((product, index) => <ProductCard key={index} product={product} />)}
//                         </div>
//                     </div>
//                     <Footer />
//                 </div>
//         )
//     }
// }

// export default Test

