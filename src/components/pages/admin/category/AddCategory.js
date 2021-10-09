import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function AddCategory(props) {

    const [category, setCategory] = useState([]);
    const [attribute, setAttribute] = useState("");
    const [attributes, setAttributes] = useState([]);
    const [error, setError] = useState({});

    const [state, setState] = useState({ title: "", description: "", parent: "", attributes: [] })

    const submit = (event) => {
        event.preventDefault()
        axios.post('/api/category',
            {
                title: state.title,
                description: state.description,
                parent: state.parent,
                attributes: attributes
            })
            .then(response => alert("Category Added!"))
            .catch(error => setError(error.response.data))
    }

    function changeHandler(event) {
        setState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    useEffect(() => {
        axios.get('/api/category')
            .then(response =>
                setCategory(response.data.map(category => category.title))
            )
    }, [])

    function addAttribute() {
        if (attribute !== "") {
            setAttributes((prevState) => [...prevState, { id: uuidv4(), value: attribute }])
        }
        setAttribute("");
    }

    const deleteAttribute = (id) => {
        setAttributes(attributes.filter((i) => (i.id !== id)))
    }

    const categoryOption = category.map((category, index) => <option value={category} key={index}>{category}</option>)

    const attributePills = attributes.map((attribute) =>
        <span key={attribute.id} className="px-4 py-2 no-underline rounded-full bg-indigo-500 font-sans font-semibold text-sm focus:outline-none active:shadow-none mr-2 text-white">{attribute.value}
            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => deleteAttribute(attribute.id)} className="cursor-pointer h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </span>)
    return (

        <div className="w-11/12">
            <div class="text-sm breadcrumbs mt-3">
                <ul>
                    <li>
                        <a onClick={() => props.changePage({ page: 'dashboard' })}>Dashboard</a>
                    </li>
                    <li>Category</li>
                </ul>
            </div>
            <div class="navbar shadow mt-3 mb-5">
                <div class="flex-1 px-2 mx-2">
                    <span class="text-lg font-semibold">
                        Add Category
                    </span>
                </div>
            </div>
            <div className="min-w-full justify-center mt-10 px-40">
                <div className="w-full" >
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-category-name">
                                Category Name
                            </label>
                            <input name="title" onChange={changeHandler} value={state.title} className={` ${error.title ? "border-red-600" : ""} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="grid-category-name" type="text" placeholder="e.g. Electronics" />
                            {error.title ? <p className="text-red-500 text-xs italic">{error.title}</p> : null}
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-category-description">
                                Description
                            </label>
                            <textarea name="description" onChange={changeHandler} value={state.description} className="h-32 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-category-description"></textarea>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-7">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label for="parent">Choose a parent category: </label>

                            <select name="parent" id="parent" onChange={changeHandler} value={state.parent} className="outline-none border-2 p-2 rounded">
                                <option selected value="NULL"> -- No Parent Category -- </option>
                                {categoryOption}
                            </select>
                        </div>
                    </div>
                    <label for="attributes" className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">Add Attributes : </label>
                    <div className="flex flex-wrap gap-2 my-5">
                        {attributePills}
                    </div>
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <input name="attribute" value={attribute} onChange={(e) => setAttribute(e.target.value)} className="w-full appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-category-name" type="text" placeholder="e.g. Size, Color" />
                        <button type="submit" className="mt-1 bg-blue-300 rounded px-5 py-1 mx-4" onClick={addAttribute}>Add</button>
                    </div>
                    <button className="bg-green-300 rounded px-7 py-2 mt-7 mb-10" onClick={submit}>Submit</button>
                </div>

            </div>

        </div>
    )
}

