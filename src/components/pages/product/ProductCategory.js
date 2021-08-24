import axios from 'axios';
import React, { useEffect, useRef } from 'react'

export default function ProductAttribute(props) {

    const { changeHandler, category, categoryOption, setAttribute } = props;

    const firstUpdate = useRef(true);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        axios.get(`/api/category/attribute/${category}`)
            .then(response => setAttribute(response.data))
            .catch(error => console.log(error))
    }, [category])

    return (
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
                <label htmlFor="category" className="block uppercase tracking-wide text-gray-700 font-medium mb-2">SELECT A CATEGORY: </label>
                <select name="category" id="category" onChange={changeHandler} value={category} className={` ${props.error !== undefined ? "border-red-500" : null} block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline`}>
                    <option selected value="null"> -- Select Category -- </option>
                    {categoryOption}
                </select>
                {props.error !== undefined ? <div className="text-red-500">{props.error}</div> : null}
            </div>
        </div>
    )
}
