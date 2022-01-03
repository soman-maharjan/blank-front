import {XIcon} from '@heroicons/react/solid';
import React, {useState} from 'react'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ProductInfo from "./ProductInfo";
import axios from "axios";

export default function ShowProduct(props) {

    const [open, setOpen] = useState(false);
    const [sku, setSku] = useState();
    const handleOpen = (sellerSku) => {
        setSku(product.sku.filter(s => s.sellerSku == sellerSku));
        setOpen(true)
    };
    const handleClose = () => setOpen(false);

    const verifyHandler = (id) => {
        axios.get(`api/product/verify/${id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => console.log(error))
    }

    const [product, setProduct] = useState(props.product);

    var attributes = [];

    for (let key in product.attributes) {
        attributes.push(
            <div>
                <label htmlFor="boxContents" className="text-gray-500">{key}</label>
                <p className="break-words capitalize">{product.attributes[key]}</p>
            </div>)
    }

    return (
        <>
            <div class="text-sm breadcrumbs mt-3 overflow-visible w-full text-left pl-14">
                <ul>
                    <li>
                        <a onClick={() => props.changePage({}, 'dashboard')}>Dashboard</a>
                    </li>
                    <li>{product.productName}</li>
                </ul>
            </div>

            <ProductInfo product={product}/>

            <div className="w-11/12 bg-white shadow-md mt-10 text-left p-5 mb-10">
                <div className="grid grid-cols-1 mb-5">
                    <p className="font-semibold text-xl mt-5">Product Verification Status

                    </p>
                    <p
                        className={`mt-3 p-2 px-6 inline-flex text-lg leading-5 ${product.is_verified ? "text-green-800 bg-green-100" : "text-red-800 bg-red-100"}`}>
                        {product.is_verified ? "Verified" : "Not Verified"}
                    </p>
                    <a onClick={() => verifyHandler(product._id)}
                       className="mt-4 px-20 normal-case mr-2 min-h-0 h-9 w-16 btn btn-ghost btn-sm rounded-btn bg-blue-500 hover:bg-blue-600 text-white">
                        {product.is_verified ? "UnVerify" : "Verify"}
                    </a>
                </div>
            </div>


            <div className="w-11/12 bg-white shadow-md mt-10 text-left p-5 mb-10">
                <div className="grid grid-cols-1 mb-5">
                    <p className="font-semibold text-xl mt-5">Stock Keeping Unit</p>
                </div>
                <hr/>
                {product.sku.map(sku =>
                    <div className="grid grid-cols-5 mt-5 gap-4">
                        <div>
                            <label htmlFor="boxContents" className="text-gray-500">Seller SKU</label>
                            <p className="break-words capitalize">{sku.sellerSku}</p>
                        </div>
                        <div>
                            <label htmlFor="orderId" className="text-gray-500">{product.variation}</label>
                            <p className="break-words capitalize">{sku.value}</p>
                        </div>
                        <div>
                            <label htmlFor="boxContents" className="text-gray-500">Price</label>
                            <p className="break-words capitalize">Rs. {sku.price}</p>
                        </div>
                        <div>
                            <label htmlFor="boxContents" className="text-gray-500">Quantity</label>
                            <p className="break-words capitalize">{sku.quantity}</p>
                        </div>
                        <div>
                            <Button onClick={() => handleOpen(sku.sellerSku)} variant="contained">Images</Button>
                        </div>
                    </div>)}
            </div>

            <div className="w-11/12 bg-white shadow-md mt-10 text-left p-5 mb-10">
                <div className="grid grid-cols-1 mb-5">
                    <p className="font-semibold text-xl mt-5">Attributes</p>
                </div>
                <hr/>

                <div className="grid grid-cols-2 mt-5 gap-4">
                    {attributes}
                </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="h-screen w-screen flex justify-center items-center bg-gray-500 bg-opacity-75 transition-opacity"
            >
                <>
                    <XIcon className="absolute top-5 right-5 z-50 w-10 text-white" onClick={handleClose}/>

                    <Box className="focus:outline-none justify-center flex flex-wrap p-5 gap-4">
                        {sku !== undefined ? sku[0].images.map(i => <img src={`${process.env.REACT_APP_IMAGE_URL}${i}`}
                                                                         className="w-60"/>) : null}
                    </Box>
                </>
            </Modal>
        </>
    )
}

