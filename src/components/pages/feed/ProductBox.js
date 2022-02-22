import React from 'react'

export default function ProductBox({product}) {

    const images = product.sku.map(sku => (sku.images)).flat(2);

    return (
        <a href={`/product/${product._id}`} className="transition duration-300 hover:opacity-70">
            <img className="feed-image" src={`${process.env.REACT_APP_IMAGE_URL}${product.sku[0].images[0]}`}/>
            <h1 className="text-left truncate">{product.productName} asd asd asd as asd asd asd asd as</h1>
            <div className="grid grid-cols-2">
                <div className="text-left truncate pr-2">
                    {product.name}
                </div>
                <div className="text-right truncate">
                    Rs. {product.sku[0].price}
                </div>
            </div>
        </a>
    )
}
