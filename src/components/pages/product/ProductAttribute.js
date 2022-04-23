import React, { useState, useEffect } from "react";

export default function ProductAttribute(props) {
  const { attribute, setState } = props;

  const [value, setValue] = useState([]);

  const changeHandler = (event) => {
    setValue((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      attributes: value,
    }));
  }, [value]);

  const inputFields = attribute.map((name, index) => (
    <div className="flex flex-wrap -mx-3 mb-6" key={index}>
      <div className="w-full px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          {name}
        </label>
        <input
          name={name}
          onChange={changeHandler}
          className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
        />
      </div>
    </div>
  ));

  return inputFields.length < 1 ? null : (
    <div className="p-4 rounded mb-16 bg-gray-200">
      {inputFields}
      {props.error !== undefined ? (
        <div className="text-red-500">Product Attributes cannot be empty</div>
      ) : null}
    </div>
  );
}
