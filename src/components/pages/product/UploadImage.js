import axios from "axios";
import React, { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import { v4 as uuidv4 } from 'uuid';

const formData = new FormData();


export default function UploadImage(props) {
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;

    const imgName = [];


    const onChange = (imageList) => {
        setImages(imageList);
        const img = imageList.map(i => i.file);

        img.forEach(element => {
            const uniqueFileName = uuidv4() + '.' + element.name.split('.').pop();

            imgName.push(uniqueFileName);

            formData.append("image", element, uniqueFileName)
        });

        props.setState(prevState => ({
            ...prevState,
            images: imgName
        }))

    };
    const submit = () => {

        console.log(formData.getAll('image'))
        axios.post("api/product/image", formData)
            .then(res => {
                // alert("Product Added!")
                // window.location.reload()
                console.log(res)
            })
            .catch(err => console.log(err.response));
    }

    return (
        <div>
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps
                }) => (
                    <div className="upload__image-wrapper">
                        <a className="bg-green-300 h-2 w-5"
                            style={isDragging ? { color: "red" } : null}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Click or Drop here
                        </a>
                        &nbsp;
                        <a className="bg-red-300 h-3 w-10" onClick={onImageRemoveAll}>Remove all images</a>
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image.data_url} alt="" width="100" />
                                <br />
                                {/* <div className="image-item__btn-wrapper">
                                    <a className="bg-blue-300 h-3 w-10" onClick={() => onImageUpdate(index)}>Update</a>
                                    <a className="bg-red-300 h-3 w-10" onClick={() => onImageRemove(index)}>Remove</a>
                                </div> */}
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>

            <a onClick={submit}> Click</a>

            {props.error !== undefined ? <div className="text-red-500">Image must be uploaded</div> : null}
        </div>
    );
}

