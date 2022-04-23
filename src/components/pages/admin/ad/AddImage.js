import axios from "axios";
import React, { useState } from "react";
import ReactImageUploading from "react-images-uploading";
import { showNotification } from "@mantine/notifications";

export default function AddImage(props) {
  //declaring state to store images
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const formData = new FormData();

  const [redirectLink, setRedirectLink] = useState("");

  // if user update image then change the image list and set image to the state
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  // data submit handler
  const submitHandler = () => {
    //remove the images array from the form
    formData.delete("images[]");

    // create a new images array with the files
    images.map((element) => formData.append("images[]", element.file));

    formData.append("redirectLink", redirectLink);

    // send a post request to the server with form data.
    axios
      .post("/api/ad", formData)
      .then((response) => {
        //show notification if the request is successful
        showNotification({
          title: "Image Uploaded!",
          message: "Image has been uploaded!",
          color: "green",
        });
        // change page to ad management after successful response
        props.changePage({ page: "manage-ads" });
      })
      .catch((error) => console.log(error.response));
  };

  return (
    <div className="w-11/12">
      <div className="text-sm breadcrumbs mt-3">
        <ul>
          <li>
            <a onClick={() => props.changePage({ page: "dashboard" })}>
              Dashboard
            </a>
          </li>
          <li>
            <a onClick={() => props.changePage({ page: "manage-ads" })}>
              Manage Ads
            </a>
          </li>
          <li>Upload Image</li>
        </ul>
      </div>
      <div className="navbar shadow mt-3 mb-7 bg-white">
        <div className="flex-1 px-2 mx-2">
          <span className="text-lg font-semibold">Upload Image</span>
        </div>

        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* component to upload image  */}
      <ReactImageUploading
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
          <div
            className="upload__image-wrapper border-blue-400 border-2 border-dotted bg-blue-100 p-10 mb-3 min-h-0"
            {...dragProps}
          >
            <button
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
              className="bg-green-300 font-normal text-black p-2 rounded m-1 cursor-pointer btn border-none min-h-0 h-10 hover:none hover:bg-green-500"
            >
              Click or Drop here
            </button>
            <button
              onClick={onImageRemoveAll}
              className="bg-red-300 text-black font-normal p-2 rounded m-1 cursor-pointer btn border-none min-h-0 h-10 hover:none hover:bg-red-500"
            >
              Remove all images
            </button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image["data_url"]} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button
                    className="bg-blue-300 text-black p-1 w-20 rounded m-1 cursor-pointer btn border-none min-h-0 h-10 font-normal hover:bg-blue-500"
                    onClick={() => onImageUpdate(index)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-300 text-black p-1 w-20 rounded m-1 cursor-pointer btn border-none min-h-0 h-10 font-normal hover:bg-red-500"
                    onClick={() => onImageRemove(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ReactImageUploading>

      <div className="text-left mt-5">
        <h1 className="font-semibold mb-2">Redirect Link</h1>
        <input
          type="text"
          onChange={(event) => setRedirectLink(event.target.value)}
          value={redirectLink}
          name="redirectLink"
          className="required appearance-none bg-gray-200 block w-full text-gray-700 border-2 border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
        ></input>
      </div>

      <button
        type="submit"
        onClick={submitHandler}
        disabled={
          images.length === 0 || redirectLink.length === 0 ? true : false
        }
        className="btn btn-success bg-green-400 border-none hover:bg-green-600 min-w-0 w-40 p-1 mt-5 tracking-wide"
      >
        Submit
      </button>
    </div>
  );
}
