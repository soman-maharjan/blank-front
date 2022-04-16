import React from 'react'

export default function ProductBox({product}) {

    const images = product.sku.map(sku => (sku.images)).flat(2);

    return (
        <a href={`/product/${product._id}`} className="transition duration-300 hover:opacity-70 bg-white">
            <img className="feed-image" src={`${process.env.REACT_APP_IMAGE_URL}${product.sku[0].images[0]}`}/>
            <h1 className="text-left truncate px-2 mt-2 font-semibold text-gray-500">{product.productName}</h1>
            <div className="grid grid-cols-2 px-2">
                <div className="text-left truncate pr-2 font-semibold">
                    {product.name}
                </div>
                <div className="text-right truncate">
                    Rs. {product.sku[0].price}
                </div>
            </div>
        </a>
    )
}
