import { Rating } from "@mui/material";
import React from "react";
import { useHistory } from "react-router";

export default function ProductCard(props) {
  const { product } = props;
  const history = useHistory();

  function displayProduct(value) {
    history.push("/product/" + value);
  }

  return (
    <div
      className="bg-white m-2 rounded transition duration-500 ease-in-out transform  hover:scale-105 hover:shadow-md"
      onClick={() => displayProduct(product._id)}
    >
      <img
        src={`${process.env.REACT_APP_URL}storage/images/${product.sku[0].images[0]}`}
        className="product-image"
      />
      <h3 className="text-ellipsis h-12">{product.productName}</h3>
      <p className="pt-2 flex justify-center">
        <Rating name="read-only" value={product.rating} readOnly />
      </p>
      <h4 className="mt-1 truncate text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
        Rs {product.sku[0].price}
      </h4>
    </div>
  );
}
