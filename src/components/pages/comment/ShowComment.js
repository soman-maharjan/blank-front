import React, {useEffect, useState} from "react";
import axios from 'axios';
import { showNotification } from '@mantine/notifications';

export default function ShowComment(props) {
    const [comment, setComment] = useState(props.comment);
    const [product, setProduct] = useState({});
    const [reply, setReply] = useState("");

    useEffect(() => {
        axios.get('api/product/' + props.comment.product_id)
            .then(response => setProduct(response.data))
            .catch(error => console.log(error.response))
    }, []);

    const submitHandler = (event) => {
        event.preventDefault()
        if (reply != "") {
            axios.post('/api/comments/' + comment._id + '/reply', {reply: reply})
                .then(response => {
                    setComment(response.data)
                    showNotification({
                        title: 'Comment Replied!',
                        message: 'Hey there, the reply has been posted!',
                        color: "green"
                    })
                })
                .catch(error => console.log(error.response))
        }
    }

    return (
        <>
            <div className="w-11/12 bg-white shadow-md mt-5 text-left p-5">
                <div className="grid grid-cols-1 mb-5">
                    <p className="font-semibold text-xl mt-5">COMMENT INFORMATION</p>
                    <p className="text-gray-500 text-md">Information about comment</p>
                </div>
                <hr/>
                <div className="grid grid-cols-1 mt-5 gap-4">
                    <div className="grid grid-cols-2 mt-2 gap-5">
                        <div>
                            <label htmlFor="productId" className="text-gray-500">Comment Id</label>
                            <p className="break-words">{comment._id}</p>
                        </div>
                        <div>
                            <label htmlFor="category" className="text-gray-500">Status</label>
                            <p className="break-words">
                            <span
                                className={` p-2 px-6 inline-flex text-md leading-5 rounded ${comment.is_verified ? "text-green-800 bg-green-100" : "text-red-800 bg-red-100"}`}>
                        {comment.is_verified ? "Verified" : "Not Verified"}
                            </span>
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 mt-2 gap-5">
                        <div>
                            <label htmlFor="category" className="text-gray-500">Product Id</label>
                            <p className="break-words capitalize">{comment.product_id}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 mt-2 gap-5">
                        <div>
                            <label htmlFor="productId" className="text-gray-500">Product Name</label>
                            <p className="break-words">{product.productName}</p>
                        </div>
                        <div>
                            <label htmlFor="productId" className="text-gray-500">Product's Category</label>
                            <p className="break-words">{product.category}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-11/12 bg-white shadow-md mt-5 text-left px-5 py-3">
                <div className="grid grid-cols-1 mt-2">
                    <div>
                        <label htmlFor="productId" className="font-semibold text-gray-500 text-lg">COMMENT</label>
                        <p className="break-words">{comment.comment}</p>
                    </div>
                </div>
            </div>
            {comment.reply == null ?
                <div className="w-11/12 bg-white shadow-md mt-5 text-left px-5 py-3 mb-5">
                    <div className="grid grid-cols-1 mt-2">
                            <div className="flex mb-2">
                                <div className="flex-1 pt-1">
                                    <label htmlFor="productId"
                                           className="font-semibold text-gray-500 text-lg">REPLY</label>

                                </div>
                                <div>
                                    <button onClick={submitHandler}
                                            className="normal-case mr-2 min-h-0 h-9 w-24 btn btn-ghost btn-sm rounded-btn bg-green-500 hover:bg-green-600 text-white">Post
                                        it!
                                    </button>
                                </div>
                            </div>
                            <textarea name="reply"
                                      className="my-3 focus:bg-white focus:border-indigo-500 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none"
                                      cols="30" rows="10" onChange={(event) => setReply(event.target.value)}>
                            {reply}
                        </textarea>
                    </div>
                </div> : null}
            {comment.reply != null ?
                <div className="w-11/12 bg-white shadow-md mt-5 text-left px-5 py-3">
                    <div className="grid grid-cols-1 mt-2">
                        <div>
                            <label htmlFor="productId" className="font-semibold text-gray-500 text-lg">YOUR
                                REPLY</label>
                            <p className="break-words">{comment.reply}</p>
                        </div>
                    </div>
                </div>
                : null}
        </>
    )
}