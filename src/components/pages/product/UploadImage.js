import React from "react";
import ImageUploading from "react-images-uploading";
import { v4 as uuidv4 } from 'uuid';


export default function UploadImage(props) {
    const [images, setImages] = React.useState([]);
    const maxNumber = 10;

    const imgName = [];

    const onChange = (imageList) => {
        setImages(imageList);
        const img = imageList.map(i => i.file);
        props.formData.delete('image[]');
        img.forEach(element => {
            const uniqueFileName = uuidv4() + '.' + element.name.split('.').pop();

            imgName.push(uniqueFileName);

            props.formData.append("image[]", element, uniqueFileName)
        });

        props.setState(prevState => ({
            ...prevState,
            images: imgName
        }))
    };


    return (
        <>
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
                    dragProps,
                }) => (
                    <div className="upload__image-wrapper border-blue-400 border-2 border-dotted bg-blue-100 min-h-40 p-10 mb-3" {...dragProps}>
                        <a className="bg-blue-300 font-normal text-black p-1 rounded m-1 cursor-pointer btn border-none min-h-0 h-10 hover:none hover:bg-blue-500"
                            style={isDragging ? { color: "red" } : null}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Drop files here or click to upload
                        </a>
                        &nbsp;
                        <a className="bg-red-300 text-black font-normal p-1 rounded m-1 cursor-pointer btn border-none min-h-0 h-10 hover:none hover:bg-red-500" onClick={onImageRemoveAll}>Remove all images</a>
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image.data_url} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                    <a className="bg-blue-300 text-black p-1 w-20 rounded m-1 cursor-pointer btn border-none min-h-0 h-10 font-normal hover:bg-blue-500" onClick={() => onImageUpdate(index)}>Update</a>
                                    <a className="bg-red-300 text-black p-1 w-20 rounded m-1 cursor-pointer btn border-none min-h-0 h-10 font-normal hover:bg-red-500" onClick={() => onImageRemove(index)}>Remove</a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
            {props.error !== undefined ? <div className="text-red-500">Image must be uploaded</div> : null}
        </>
    );
}

