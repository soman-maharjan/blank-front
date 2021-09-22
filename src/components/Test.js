// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// // import ReactPaginate from 'react-paginate';
// import DisplayProduct from './pages/search/DisplayProduct';

// export default function Test(props) {

//     const [state, setState] = useState({ current_page: 1, last_page: 1, links: [], next_page: "" });
//     const [products, setProducts] = useState();
//     const [filteredData, setFilteredData] = useState();

//     useEffect(() => {
//         const url = 'api/product';
//         axios.get(url)
//             .then(response => {
//                 console.log(response)
//                 setProducts(response.data.data)
//                 setFilteredData(response.data.data)
//                 setState({
//                     current_page: response.data.data.current_page,
//                     last_page: response.data.data.last_page,
//                     links: response.data.links,
//                     next_page: response.data.next_page
//                 })
//             })
//             .catch(error => console.log(error))
//     }, [])

//     const val = state.links.map((l, index) => <span className="mx-2">{index}</span>)
//     // console.log(state.links)
//     return (
//         <div>
//             <DisplayProduct products={products} setProduct={setProducts} filteredData={filteredData} setFilteredData={setFilteredData} />
//             {val}
//         </div>
//     )
// }
