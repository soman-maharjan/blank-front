import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCategory from './ProductCategory';
import ProductAttribute from './ProductAttribute';
import JoditEditor from "jodit-react";
import ProductStock from './ProductStock';
import ImageUpload from './ImageUpload';
import UploadImage from './UploadImage'

const formData = new FormData();

export default function AddProduct() {

    const [state, setState] = useState({ productName: "", description: "", category: "", boxContents: "", variation: "", color: "", sku: [], attributes: [], image: "" });

    // const [img, setImg] = useState([]);
    const [category, setCategory] = useState([]);
    const [attribute, setAttribute] = useState([]);
    const [description, setDescription] = useState('')

    const categoryOption = category.map((category, index) => <option value={category} key={index}>{category}</option>)

    const [errors, setErrors] = useState({});



    // const onDrop = useCallback(acceptedFiles => {

    //     setState(prevState => ({
    //         ...prevState,
    //         images: acceptedFiles
    //     }))
    //     console.log(typeof (acceptedFiles))
    //     console.log(acceptedFiles)
    //     console.log(state)
    // }, [])

    // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    // const files = state.images.map(file => (
    //     <li key={file.path}>
    //         {file.path} - {file.size} bytes
    //     </li>
    // ));

    function changeHandler(event) {

        // console.log(formData.getAll('image'))
        // console.log(state)

        setState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value,
            description: description
        }))
    }

    function submitHandler(event) {
        // console.log(state)

        event.preventDefault();

        axios.post('/api/product', state)
            .then(response => {
                alert("Product Added!")
                window.location.reload()
            })
            .catch(error => setErrors(error.response.data))

        // console.log(formData.getAll('image'))

        // axios.post("api/product/image", formData)
        //     .then(res => {
        //         // alert("Product Added!")
        //         // window.location.reload()
        //         console.log(res)
        //     })
        //     .catch(err => console.log(err.response));
    }

    function updateForm(name, element, uniqueFileName) {
        formData.append(name, element, uniqueFileName)
    }

    useEffect(() => {
        axios.get('/api/category')
            .then(response =>
                setCategory(response.data.map(d => d.title))
            )
            .catch(error => console.log(error));
    }, []);



    return (
        <div>
            <h1 className="text-xl font-semibold mt-2">PRODUCT DETAILS</h1>
            <div className="flex justify-center mt-10">
                <form className="w-full max-w-3xl" >

                    {/* <div class="flex flex-col w-full">
                        <div class="grid h-20 card bg-base-300 rounded-box place-items-center">content</div>
                        <div class="divider"></div>
                        <div class="grid h-20 card bg-base-300 rounded-box place-items-center">content</div>
                    </div> */}
                    <div className="p-4 rounded mb-16 bg-gray-200">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 font-medium mb-2" >
                                    Product Name
                                </label>
                                <input required name="productName" onChange={changeHandler} value={state.productName} className={` ${errors.productName ? "border-red-500" : null} appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} type="text" placeholder="e.g. Electronics" />
                                {errors.hasOwnProperty('productName') ? <div className="text-red-500">{errors.productName}</div> : null}
                            </div>
                        </div>

                        <ProductCategory changeHandler={changeHandler} category={state.category} categoryOption={categoryOption} setAttribute={setAttribute} error={errors.category} />

                    </div>
                    {/* {attribute !== "" ?
                        <label className="block uppercase tracking-wide text-gray-700 font-medium mb-3" >
                            Attributes
                        </label> : null} */}
                    {attribute !== "" ?
                        <ProductAttribute attribute={attribute} setState={setState} state={state} error={errors.attributes} />
                        : null}

                    <div className="p-4 rounded mb-10 bg-gray-200 mb-16">
                        <label className="block uppercase tracking-wide text-gray-700 font-medium mb-3" >
                            DETAIL DESCRIPTION
                        </label>
                        <JoditEditor
                            value={description}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setDescription(newContent)} // preferred to use only this option to update the content for performance reasons
                        />
                        <br />
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 font-medium mb-3" >
                                    Box Contents
                                </label>

                                <input name="boxContents" value={state.boxContents} onChange={changeHandler} className={` ${errors.boxContents ? "border-red-500" : null} appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} type="text" placeholder="e.g. 1 pc Phone, 1 Charger" />
                                {errors.hasOwnProperty('boxContents') ? <div className="text-red-500">{errors.boxContents}</div> : null}
                            </div>
                        </div>
                    </div>

                    <hr />
                    <div className="p-4 rounded mb-10 bg-gray-200 mb-16">
                        <div className="flex flex-wrap -mx-3 mb-6 mt-2">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 font-medium mb-3" >
                                    Price and Stock
                                </label>
                                Color Family
                                <input name="color" value={state.color} onChange={changeHandler} className={` ${errors.productName ? "border-red-500" : null} appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} type="text" placeholder="e.g. Red" />
                                {errors.hasOwnProperty('color') ? <div className="text-red-500">{errors.color}</div> : null}
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6 mt-2">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                Variation
                                <input name="variation" type="text" value={state.variation} onChange={changeHandler} className={` ${errors.variation ? "border-red-500" : null} appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} placeholder="e.g. Size, Color" />
                                {errors.hasOwnProperty('variation') ? <div className="text-red-500">{errors.variation}</div> : null}
                            </div>
                        </div>

                        {/* IMAGES
                    <div {...getRootProps()} className="p-10 border border-black-600 m-2">
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                                <p>Drop the files here ...</p> :
                                <p>Drag 'n' drop some files here, or click to select files</p>
                        }
                    </div> */}
                        <ProductStock setState={setState} state={state} />

                    </div>
                    <ImageUpload setState={setState} error={errors.image} />

                    {/* <UploadImage setState={setState} error={errors.image} updateForm={updateForm} /> */}
                    <button type="submit" className="bg-green-300 rounded px-5 py-1 mb-10" onClick={submitHandler}>Submit</button>

                </form>
            </div>
        </div>
    )
}
