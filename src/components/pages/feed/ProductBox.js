import React from 'react'

export default function ProductBox({ product }) {

    var images = images = product.sku.map(sku => (sku.images)).flat(2);

    return (
        <div className="h-auto">
            <h1 className="text-left">{product.productName}</h1>
            <img className="feed-image" src={`${process.env.REACT_APP_IMAGE_URL}${product.sku[0].images[0]}`} />
        </div>
    )
}
