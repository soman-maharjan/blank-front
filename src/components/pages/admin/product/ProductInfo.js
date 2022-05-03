import {Rating} from "@mui/material";
import React from "react";

export default function ProductInfo(props) {
    const {product} = props;
    return (
        <div className="w-11/12 bg-white shadow-md mt-5 text-left p-5">
            <div className="grid grid-cols-1 mb-5">
                <p className="font-semibold text-xl mt-5">PRODUCT INFORMATION</p>
                <p className="text-gray-500 text-md">Information about product</p>
            </div>
            <hr/>
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
                        <p><Rating name="read-only" value={product.rating} readOnly/></p>
                    </div>
                    <div>
                        <label htmlFor="boxContents" className="text-gray-500">Status</label>
                        <p className="break-words">
                            <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full${product.is_verified ? "text-green-800 bg-green-100" : "text-red-800 bg-red-100"}`}>
                                {product.is_verified ? "Verified" : "Not Verified"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}