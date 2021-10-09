import { ChevronRightIcon } from '@heroicons/react/solid';
import React from 'react'
import { Link } from 'react-router-dom';
// import image from '../images/error.png'
import error from '../images/404.png'

class NotFound extends React.Component {
    render() {
        return (
            <>
                {/* <div className="flex justify-center">
                    <img src={image} className="h-screen w-screen "></img>
                    Not Found
                </div> */}
                <div class="h-screen grid grid-cols-2 gap-4 items-center">
                    <div className="text-right">
                        <h1 style={{ 'font-size': '20rem' }} className="font-bold mr-16">404</h1>
                    </div>
                    <div className="text-left">
                        <h1 className="text-8xl mb-10">Oops!</h1>
                        <h1 className="text-3xl my-5 font-bold">Something's missing</h1>
                        <h1 className="text-xl pr-28 mb-5">This page is missing or you assembled the link incorrectly.</h1>
                        <Link to="/" className="text-blue-500 flex">Go To Homepage {'>'}</Link>
                    </div>
                </div>
            </>
        )
    }
}

export default NotFound;
