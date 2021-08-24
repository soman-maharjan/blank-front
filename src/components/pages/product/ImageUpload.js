import React, { Component } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const formData = new FormData();


class ImageUpload extends Component {
    state = {
        selectedFile: null
    };



    // On file select (from the pop up) 
    onFileChange = event => {
        // Update the state 
        this.setState({ selectedFile: event.target.files[0] });

    };

    onFileUpload = (event) => {
        event.preventDefault();

        const uniqueFileName = uuidv4() + '.' + this.state.selectedFile.name.split('.').pop();

        formData.append(
            "image",
            this.state.selectedFile,
            uniqueFileName
        );

        this.props.setState(prevState => ({
            ...prevState,
            image: uniqueFileName
        }))

        axios.post("api/product/image", formData)
            .then(res => console.log(res))
            .catch(err => console.log(err));

    };
    fileData = () => {
        if (this.state.selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                    <p>
                        Last Modified:{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    render() {
        return (
            <div className="block uppercase tracking-wide text-gray-700 font-medium p-4 rounded mb-10 bg-gray-200">
                <label>
                    Upload Image
                </label>
                <div className="mt-3">
                    <input type="file" onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload} className="bg-green-300 px-4 py-1 rounded">
                        Upload!
                    </button>
                </div>
                {this.fileData()}
                {this.props.error !== undefined ? <div className="text-red-500">Image must be uploaded</div> : null}
            </div>
        );
    }
}

export default ImageUpload;