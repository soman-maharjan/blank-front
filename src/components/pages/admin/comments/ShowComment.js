import React, {useState} from "react";
import axios from "axios";
import {showNotification} from "@mantine/notifications";

export default function ShowComment(props) {

    const [comment, setComment] = useState(props.comment);

    const verifyHandler = (id) => {
        // change the verification status of the comment.
        // if the comment is verified, unverify it and vice versa
        axios.get(`api/comments/verify/${id}`)
            .then(response => {
                setComment(response.data);
                showNotification({
                    title: response.data.is_verified ? 'Comment Verified!' : 'Comment Verification Removed!',
                    message: response.data.is_verified ? 'The comment has been verified and will be visible to customers!' : 'The comment verification has been removed and will be hidden from the customers.',
                    color: response.data.is_verified ? "green" : 'blue'
                })
            })
            .catch(error => console.log(error))
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
                            <p className="break-words">
                            <span
                                className={`mt-3 p-2 px-6 inline-flex text-md leading-5 rounded ${comment.is_verified ? "text-green-800 bg-green-100" : "text-red-800 bg-red-100"}`}>
                        {comment.is_verified ? "Verified" : "Not Verified"}
                            </span>
                            </p>
                        </div>

                    </div>
                    <div className="grid grid-cols-2 mt-2 gap-5">
                        <div>
                            <label htmlFor="productName" className="text-gray-500">User Id</label>
                            <p className="break-words capitalize">{comment.user_id}</p>
                        </div>
                        <div>
                            <label htmlFor="category" className="text-gray-500">Product Id</label>
                            <p className="break-words capitalize">{comment.product_id}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 mt-2">

                        <div>
                            <label htmlFor="productId" className="text-gray-500">Comment</label>
                            <p className="break-words">{comment.comment}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-11/12 bg-white shadow-md mt-10 text-left p-5 mb-10">
                <div className="grid grid-cols-1 mb-5">
                    <p className="font-semibold text-xl mt-5">Change Verification Status
                    </p>
                    <a onClick={() => verifyHandler(comment._id)}
                       className="mt-4 px-20 normal-case mr-2 min-h-0 h-9 w-16 btn btn-ghost btn-sm rounded-btn bg-indigo-500 hover:bg-indigo-600 text-white">
                        {comment.is_verified ? "UnVerify" : "Verify"}
                    </a>
                </div>
            </div>
        </>
    )
}