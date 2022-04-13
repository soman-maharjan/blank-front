import axios from 'axios'
import React, {useEffect, useState} from 'react'
import Review from './Review';

export default function Reviews(props) {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get('api/reviews/' + props.productId)
            .then(response => setReviews(response.data))
            .catch(error => console.log(error.response))
    }, [])

    const items = reviews.map(r => <Review data={r}/>);

    return (
        <div className="w-full rounded bg-white shadow-md p-5 pl-10 mx-auto text-gray-800 relative md:text-left">
            <div className="items-center">
                <h6 className="text-lg font-semibold leading-normal mt-0 mb-4 border-b pb-2">Product Reviews and
                    Rating</h6>
                <div>
                    {items}
                    {items.length == 0 ?
                        <div className="text-gray-500 text-center">
                            This product has no reviews.
                        </div>
                        : ""}
                </div>
            </div>
        </div>
    )
}
