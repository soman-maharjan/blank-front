import React, { useEffect, useState } from 'react';
import UploadImage from './UploadImage';

function getId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

export default function ProductStock(props) {

    const [sku, setSku] = useState([{ value: "", price: "", quantity: 0, sellerSku: 'SKU-' + getId(), images: [] }])
    const [img, setImg] = useState([{ image: [] }]);

    const { state, setState, formData } = props;

    let handleChange = (i, e) => {
        let newFormValues = [...sku];
        newFormValues[i][e.target.name] = e.target.value;
        newFormValues[i].images = img[i].image;

        setSku(newFormValues);

        setState(prevState => ({
            ...prevState,
            sku: sku
        }))
    }

    let addFormFields = () => {
        setImg([...img, { image: [] }])
        setSku([...sku, { value: "", price: "", quantity: 0, sellerSku: 'SKU-' + getId(), images: [] }])

        console.log(sku)
    }

    let removeFormFields = (i) => {
        let newFormValues = [...sku];
        newFormValues.splice(i, 1);
        setSku(newFormValues)
    }

    useEffect(() => {
        let newFormValues = [...sku];

        for (var i = 0; i < img.length; i++) {
            newFormValues[i].images = img[i].image;
        }

        setSku(newFormValues);

        setState(prevState => ({
            ...prevState,
            sku: sku
        }))
    }, [img])

    return (
        <>
            <label className="block uppercase tracking-wide text-gray-700 font-medium mb-3">
                Stock Keeping Unit
            </label>
            {/* <div className="button-section"> */}
            <button className="bg-green-300 p-1 left-0 pl-10 pr-10 mb-3" type="button" onClick={() => addFormFields()}>Add</button>
            {/* </div> */}
            {sku.map((element, index) => (
                <div className={`form-inline ${(index === 0) ? "mr-7" : ""}`} key={index}>
                    <label>Value </label>
                    <input type="text" required name="value" value={element.value || ""} onChange={e => handleChange(index, e)} className="appearance-none w-20 text-gray-700 border border-gray-200 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    <label> Price </label>
                    <input type="number" required name="price" min="1" value={element.price || ""} onChange={e => handleChange(index, e)} className="appearance-none w-20 text-gray-700 border border-gray-200 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    <label> Quantity </label>
                    <input type="number" required name="quantity" min="1" value={element.quantity || ""} onChange={e => handleChange(index, e)} className="appearance-none w-20 text-gray-700 border border-gray-200 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    <label> Seller SKU - </label>
                    <input type="text" required name="sellerSku" value={element.sellerSku} disabled onChange={e => handleChange(index, e)} className="appearance-none w-24 text-gray-700 border border-gray-200 rounded mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    {
                        index ?
                            <button type="button" className="bg-red-400 rounded ml-2 w-5" onClick={() => removeFormFields(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </button>
                            : null
                    }
                    <UploadImage setState={setState} formData={formData} setImg={setImg} i={index} img={img} element={element} />
                </div>
            ))}

            {props.error !== undefined ? <div className="text-red-500">SKU fields cannot be empty</div> : null}

        </>
    )
}
