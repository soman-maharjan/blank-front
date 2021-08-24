import { StarIcon } from '@heroicons/react/solid';
import React from 'react'
import { useHistory } from 'react-router';

export default function ProductCard(props) {
    const { product } = props;
    const history = useHistory();

    function displayProduct(value) {
        history.push('/product/' + value);
    }
    return (
        <div className="bg-white m-2 rounded transition duration-500 ease-in-out transform  hover:scale-105 hover:shadow-md" onClick={() => displayProduct(product._id)}>
            <img src={`http://127.0.0.1:8000/storage/images/${product.image}`} className="product-image" />
            <h3 className="text-ellipsis h-12">{product.productName}</h3>
            <p className="pt-2 flex justify-center">
                <StarIcon className="h-5 w-5" fill="#FF9529" />
                <StarIcon className="h-5 w-5" fill="#FF9529" />
                <StarIcon className="h-5 w-5" fill="#FF9529" />
                <StarIcon className="h-5 w-5" fill="#FF9529" />
                <StarIcon className="h-5 w-5" fill="#FF9529" />
            </p>
            <h4 className="mt-1 truncate text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">Rs {product.sku[0].price}</h4>
        </div>
    )
}
