import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../homepage/Footer";
import Navbar from "../homepage/Navbar";
import Loading from "../Loading";
import DisplayProduct from "./DisplayProduct";

export default function Search(props) {
  const [products, setProducts] = useState();

  const [filters, setFilters] = useState({
    min: "",
    max: "",
    rating: "0",
    sort: "Relevance",
  });

  const [nextPage, setNextPage] = useState("");

  useEffect(() => {
    submitHandler();
  }, [props.word]);

  const submitHandler = () => {
    axios
      .post("api/search", {
        value: props.word,
        ...filters,
      })
      .then((response) => {
        console.log(response.data);
        setProducts(response.data.data);
        setNextPage(response.data.next_page_url);
      })
      .catch((error) => console.log(error.response));
  };

  return products === undefined ? (
    <Loading />
  ) : (
    <div className="bg-gray-100 h-full">
      <Navbar />
      <DisplayProduct
        submitHandler={submitHandler}
        products={products}
        setProducts={setProducts}
        filters={filters}
        setFilters={setFilters}
        nextPage={nextPage}
        setNextPage={setNextPage}
        value={props.word}
      />
      <Footer />
    </div>
  );
}
