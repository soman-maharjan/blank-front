import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Ad from '../../homepage/Ad';
import { v4 as uuidv4 } from 'uuid';

import { useHistory } from 'react-router';
import ImageCard from './ImageCard';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ManageAds(props) {
    const [option, setOption] = useState("");
    const [id, setId] = useState("");
    const [reloadId, setReloadId] = useState("")
    const [loading, setLoading] = useState(false);

    const [images, setImages] = useState([]);

    const history = useHistory();

    useEffect(() => {
        axios.get('/api/ad')
            .then(response => {
                setImages(response.data)
                setLoading(true)
            })
            .catch(error => console.log(error))
    }, [])

    const submitHandler = () => {
        axios.post('/api/ad/update-ad', {
            id: id,
            option: option
        })
            .then(response => {
                setImages(response.data)
                setReloadId(uuidv4())
            })
            .catch(error => console.log(error.response))
    }

    const img = images.map(i =>
        i.active == false ?
            <ImageCard i={i} setOption={setOption} setId={setId} classNames={classNames} /> :
            null
    );

    const carouselImg = images.map(i =>
        i.position == 'carousel' ?
            <ImageCard i={i} setOption={setOption} setId={setId} classNames={classNames} /> :
            null
    );

    return (
        <>
            <div className="w-11/12">
                <div class="text-sm breadcrumbs mt-3">
                    <ul>
                        <li>
                            <a onClick={() => props.changePage({ page: 'dashboard' })}>Dashboard</a>
                        </li>
                        <li>Manage Ads</li>
                    </ul>
                </div>
                {/* <h1 className="text-2xl mb-10">Manage Products</h1> */}
                <div class="navbar shadow mt-3 mb-5 bg-white">
                    <div class="flex-1 px-2 mx-2">
                        <span class="text-lg font-semibold">
                            Manage Ads
                        </span>
                    </div>

                    <div class="flex-none hidden px-2 mx-2 lg:flex">
                        <div class="flex items-stretch">
                            <a className="btn btn-ghost btn-sm rounded-btn bg-green-400 hover:bg-green-500 text-white" onClick={() => props.changePage({ page: 'add-image' })}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add Image
                            </a>
                        </div>
                    </div>
                </div>
                <div className="my-10 mx-5">
                    {/* <div className="grid grid-rows-3 grid-flow-col gap-1">
                        <div className="row-span-3 bg-red-200">1</div>
                        <div className="col-span-2 bg-green-200 h-40">2</div>
                        <div className="row-span-2 col-span-2 bg-blue-200">3</div>
                    </div> */}
                    <div class="border bg-white mockup-window border-base-300">
                        <Ad key={reloadId} />
                    </div>
                </div>
                <div className="grid grid-cols-1 mb-5 text-left">
                    <p className="font-semibold text-xl mt-5">Images</p>
                </div>
                <hr />
                <div className="mt-5 flex flex-wrap mb-5">
                    {img}
                </div>
                <div className="grid grid-cols-1 mb-5 text-left">
                    <p className="font-semibold text-xl mt-5">Carousel</p>
                </div>
                <hr />
                <div className="mt-5 flex flex-wrap mb-20">
                    {carouselImg}
                </div>
            </div>


            {/* modal */}
            <div id="my-modal" class="modal">
                <div class="modal-box">
                    {option !== 'delete' ?
                        <p>Do you want to set it as {option} ?</p>
                        :
                        <p>Do you want to delete the image?</p>}
                    <div class="modal-action justify-center">
                        <a onClick={submitHandler} href="#" className="btn btn-primary bg-green-500 hover:bg-green-700 border-none min-w-0 w-20 min-h-0 h-10">Yes</a>
                        <a className="btn btn-primary bg-gray-500 hover:bg-gray-700 border-none min-w-0 w-20 min-h-0 h-10" href="#">No</a>
                    </div>
                </div>
            </div>
        </>
    )
}
