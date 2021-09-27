import { StarIcon, XIcon } from '@heroicons/react/solid';
import React, { useState } from 'react'
import Loading from '../Loading';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

export default function Product(props) {

    const [open, setOpen] = useState(false);
    const [sku, setSku] = useState();
    const handleOpen = (sellerSku) => {
        setSku(product.sku.filter(s => s.sellerSku == sellerSku));
        setOpen(true)
    };
    const handleClose = () => setOpen(false);

    const product = props.product;

    const [loading, setLoading] = useState(false);

    var icon = [];
    var attributes = [];

    for (let key in product.attributes) {
        attributes.push(
            <div>
                <label htmlFor="boxContents" className="text-gray-500">{key}</label>
                <p className="break-words capitalize">{product.attributes[key]}</p>
            </div>)
    }


    for (let y = 0; y < product.rating; y++) {
        icon.push(<StarIcon className="h-5 w-5" fill="#FF9529" />)
    }

    return loading ? <Loading /> : (
        <>
            <div class="text-sm breadcrumbs mt-3 overflow-visible w-full text-left pl-14">
                <ul>
                    <li>
                        <a onClick={() => props.changePage({}, 'dashboard')}>Dashboard</a>
                    </li>
                    <li>{product.productName}</li>
                </ul>
            </div>
            <div className="w-11/12 bg-white shadow-md mt-5 text-left p-5">
                <div className="grid grid-cols-1 mb-5">
                    <p className="font-semibold text-xl mt-5">PRODUCT INFORMATION</p>
                    <p className="text-gray-500 text-md">Information about product</p>
                </div>
                <hr />
                <div className="grid grid-cols-1 mt-5 gap-4">
                    <div className="grid grid-cols-2 mt-2 gap-5">

                        <div>
                            <label htmlFor="productId" className="text-gray-500">Product Id</label>
                            <p className="break-words">{product._id}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 mt-2 gap-5">
                        <div>
                            <label htmlFor="productName" className="text-gray-500">Product Name</label>
                            <p className="break-words capitalize">{product.productName}</p>
                        </div>
                        <div>
                            <label htmlFor="category" className="text-gray-500">Category</label>
                            <p className="break-words capitalize">{product.category}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="variation" className="text-gray-500 capitalize">Color</label>
                            <p className="break-words capitalize">{product.color}</p>
                        </div>
                        <div>
                            <label htmlFor="price" className="text-gray-500">Box Contents</label>
                            <p className="break-words capitalize">{product.boxContents}</p>
                        </div>

                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="boxContents" className="text-gray-500">Rating</label>
                            <p className="flex">{icon}</p>
                        </div>
                        <div>
                            <label htmlFor="boxContents" className="text-gray-500">Status</label>
                            <p className="break-words">
                                {product.is_active ?
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Active
                                    </span> :
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                        Not Active
                                    </span>}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-11/12 bg-white shadow-md mt-10 text-left p-5 mb-10">
                <div className="grid grid-cols-1 mb-5">
                    <p className="font-semibold text-xl mt-5">Stock Keeping Unit</p>
                </div>
                <hr />
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
                <hr />

                    <div className="grid grid-cols-2 mt-5 gap-4">
                        {attributes}
                    </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="h-screen w-screen flex justify-center items-center"
            >
                <>
                    <XIcon className="absolute top-5 right-5 z-50 w-14 text-white" onClick={handleClose} />

                    <Box className="focus:outline-none justify-center flex flex-wrap p-5 gap-4">
                        {sku !== undefined ? sku[0].images.map(i => <img src={`${process.env.REACT_APP_IMAGE_URL}${i}`} className="w-60" />) : null}
                    </Box>
                </>
            </Modal>
        </>
    )
}

