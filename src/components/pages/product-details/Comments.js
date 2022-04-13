import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useSelector} from "react-redux";
import {showNotification} from "@mantine/notifications";
import Moment from "react-moment";

function Comments({productId, user}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const userAuth = useSelector(state => state.userAuth);
    useEffect(() => {
        axios.get('/api/comments/product/' + productId)
            .then(response => {
                setComments(response.data)
            })
            .catch(error => console.log(error.response))
    }, []);

    const submit = (event) => {
        event.preventDefault();
        if (comment != "") {
            axios.post('api/comments', {comment: comment, product_id: productId})
                .then(response => {
                    setComment("")
                    showNotification({
                        title: 'Comment Posted!',
                        message: 'The comment has been posted and is under review! It will be visible to seller after reviewing.',
                        color: "green"
                    })
                })
                .catch(error => console.log(error.response))
        }
    }

    const c = comments.map(c =>
        <div className="my-4">
            <hr className="mb-4"/>
            <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-5 mt-1 text-red-500" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p>{c.comment}</p>
            </div>
            <p className="text-gray-400 text-sm ml-10">User****** <span className="ml-4"> - <Moment fromNow>{c.created_at}</Moment></span></p>
            <div className="flex mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1 mr-5 text-indigo-500" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                </svg>
                <p>{c.reply ? c.reply : ""}</p>
            </div>
            <p className="text-gray-400 text-sm ml-10">{user} <span className="ml-4"> - <Moment fromNow>{c.updated_at}</Moment></span></p>

        </div>)

    return (
        <div className="w-full rounded bg-white shadow-md p-5 px-10 mx-auto text-gray-800 relative md:text-left mt-4">
            <div className="items-center">
                <h6 className="text-lg font-semibold leading-normal mt-0 mb-4 border-b pb-2">Comments</h6>
                {userAuth.isAuthenticated ?
                    <div>
                        <div className="form-control">
                            <form>
                                <div className="relative">
                                    <input type="text"
                                           value={comment}
                                           onChange={(event) => setComment(event.target.value)}
                                           placeholder="Place Your Comment"
                                           className="pl-5 border pr-28 h-10 focus:none focus:ring-indigo-500 outline-none focus:border-indigo-500 flex-1 block w-full border-gray-300 rounded"/>
                                    <button
                                        onClick={submit}

                                        className="absolute rounded-none top-0 right-0 rounded-l-none btn min-h-0 h-10 bg-indigo-500 hover:bg-indigo-600 border-none  rounded">Post
                                        it!
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    :
                    <><a href='/login'
                         className="text-blue-500 hover:underline">Login</a> or <a
                        className="text-blue-500 hover:underline" href='/register'>Register</a> to make a Comment.</>
                }
                <div>
                    {c}
                    {comments.length == 0 ?
                        <div className="text-gray-500 text-center mt-5">
                            This product has no comments. <br/>
                            Be the first one to comment.
                        </div>
                        : ""}
                </div>
            </div>
        </div>
    );
}

export default Comments;