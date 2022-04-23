import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCategory from "./ProductCategory";
import ProductAttribute from "./ProductAttribute";
import JoditEditor from "jodit-react";
import ProductStock from "./ProductStock";
import ImageUpload from "./ImageUpload";

export default function EditProduct(props) {
  const [state, setState] = useState(props.product);

  const [category, setCategory] = useState([]);
  const [attribute, setAttribute] = useState([]);
  const [description, setDescription] = useState(props.product.description);

  const categoryOption = category.map((category, index) => (
    <option value={category} key={index}>
      {category}
    </option>
  ));

  const [errors, setErrors] = useState({});

  function changeHandler(event) {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
      description: description,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    const url = "/api/product/" + state._id;
    axios
      .put(url, state)
      .then((response) => {
        alert("Product Updated!");
        window.location.reload();
      })
      .catch((error) => setErrors(error.response.data));
  }

  useEffect(() => {
    axios
      .get("/api/category")
      .then((response) => setCategory(response.data.map((d) => d.title)))
      .catch((error) => console.log(error));
  }, []);

  var attr = [];

  for (var key in state.attributes) {
    attr.push(
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 font-medium mb-3">
            {key}
          </label>
          <input
            name={key}
            value={state.attributes[key]}
            onChange={changeHandler}
            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-10">
      <div class="navbar shadow mt-3 mb-5">
        <div class="flex-1 px-2 mx-2">
          <span class="text-lg font-semibold">EDIT PRODUCT</span>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <form className="w-full max-w-3xl">
          <div className="p-4 rounded mb-16 bg-gray-200">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 font-medium mb-2">
                  Product Name
                </label>
                <input
                  required
                  name="productName"
                  onChange={changeHandler}
                  value={state.productName}
                  className={` ${
                    errors.productName ? "border-red-500" : null
                  } appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  type="text"
                  placeholder="e.g. Electronics"
                />
                {errors.hasOwnProperty("productName") ? (
                  <div className="text-red-500">{errors.productName}</div>
                ) : null}
              </div>
            </div>
            <ProductCategory
              changeHandler={changeHandler}
              category={state.category}
              categoryOption={categoryOption}
              setAttribute={setAttribute}
              error={errors.category}
            />
          </div>
          <div className="p-4 rounded bg-gray-200 mb-16">
            <label className="block uppercase tracking-wide text-gray-700 font-medium mb-3">
              DETAIL DESCRIPTION
            </label>
            <JoditEditor
              value={description}
              tabIndex={1}
              onBlur={(newContent) => setDescription(newContent)}
            />
            <br />
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 font-medium mb-3">
                  Box Contents
                </label>

                <input
                  name="boxContents"
                  value={state.boxContents}
                  onChange={changeHandler}
                  className={` ${
                    errors.boxContents ? "border-red-500" : null
                  } appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  type="text"
                  placeholder="e.g. 1 pc Phone, 1 Charger"
                />
                {errors.hasOwnProperty("boxContents") ? (
                  <div className="text-red-500">{errors.boxContents}</div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="p-4 rounded bg-gray-200 mb-16">{attr}</div>

          <hr />
          <div className="p-4 rounded bg-gray-200 mb-16">
            <div className="flex flex-wrap -mx-3 mb-6 mt-2">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 font-medium mb-3">
                  Price and Stock
                </label>
                Color
                <input
                  name="color"
                  value={state.color}
                  onChange={changeHandler}
                  className={` ${
                    errors.productName ? "border-red-500" : null
                  } appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  type="text"
                  placeholder="e.g. Red"
                />
                {errors.hasOwnProperty("color") ? (
                  <div className="text-red-500">{errors.color}</div>
                ) : null}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6 mt-2">
              <div className="w-full px-3 mb-6 md:mb-0">
                Variation
                <input
                  name="variation"
                  value={state.variation}
                  onChange={changeHandler}
                  className={` ${
                    errors.variation ? "border-red-500" : null
                  } appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  type="text"
                  placeholder="e.g. Size, Color"
                />
                {errors.hasOwnProperty("variation") ? (
                  <div className="text-red-500">{errors.variation}</div>
                ) : null}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-300 rounded px-5 py-1 mb-10"
            onClick={submitHandler}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
