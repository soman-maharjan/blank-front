import React, {useEffect, useState} from 'react';
import Comment from "./Comment";
import axios from "axios";
import {useSelector} from "react-redux";

function Comments({productId}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const userAuth = useSelector(state => state.userAuth);
    useEffect(() => {
        axios.get('/api/comments/' + productId)
            .then(response => {
                console.log(response)
            })
            .catch(error => console.log(error.response))
    }, []);

    const submit = (event) => {
        event.preventDefault();
        if (comment != "") {
            axios.post('api/comments', {comment: comment, productId: productId})
                .then(response => console.log(response))
                .catch(error => console.log(error.response))
        }
    }

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
                                           className="pl-5 border pr-16 h-10 focus:none focus:ring-indigo-500 outline-none focus:border-indigo-500 flex-1 block w-full border-gray-300 rounded"/>
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
                    {comments.map(c => <Comment comment={c}/>)}
                    {comments.length == 0 ? "No Comments" : ""}
                </div>
            </div>
        </div>
    );
}

export default Comments;