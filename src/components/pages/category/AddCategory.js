import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function AddCategory() {

    const [category, setCategory] = useState([]);
    const [attribute, setAttribute] = useState("");
    const [attributes, setAttributes] = useState([]);


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
            .catch(error => console.log(error.response))
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
    const attributePills = attributes.map((attribute) => <span key={attribute.id} className="py-2 px-4 shadow-md no-underline rounded-full bg-blue-500 font-sans font-semibold text-sm border-blue btn-primary hover:bg-blue-light focus:outline-none active:shadow-none mr-2 text-white">{attribute.value}
        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => deleteAttribute(attribute.id)} className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg></span>)
    return (

        <div>
            <h1 className="text-xl font-semibold mt-10">ADD CATEGORY</h1>

            <div className="flex justify-center mt-10">
                <div className="w-full max-w-lg" >
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-category-name">
                                Category Name
                            </label>
                            <input name="title" onChange={changeHandler} value={state.title} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-category-name" type="text" placeholder="e.g. Electronics" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-category-description">
                                Description
                            </label>
                            <textarea name="description" onChange={changeHandler} value={state.description} className="h-32 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-category-description"></textarea>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label for="parent">Choose a parent category: </label>

                            <select name="parent" id="parent" onChange={changeHandler} value={state.parent}>
                                <option selected value="NULL"> -- No Parent Category -- </option>
                                {categoryOption}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label for="attributes">Attributes : {attributePills}</label>
                        </div>
                    </div>
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <input name="attribute" value={attribute} onChange={(e) => setAttribute(e.target.value)} className="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-category-name" type="text" placeholder="e.g. Size, Color" />
                        <button type="submit" className="bg-green-300 rounded px-5 py-1" onClick={addAttribute}> Add Attribute</button>
                    </div>
                    <button className="bg-green-300 rounded px-5 py-1" onClick={submit}>Submit</button>
                </div>

            </div>

        </div>
    )
}

