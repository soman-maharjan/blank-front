import React from 'react'
import ImageUploading from 'react-images-uploading';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function AddReviewModal() {
    return (
        <Transition appear show={this.state.open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={() => this.setState({ ...this.state, open: false })}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                Leave a Review
                            </Dialog.Title>
                            <div className="mt-4">
                                <textarea className="textarea textarea-bordered" cols="100" rows="10" name="review" onChange={this.changeHandler} value={this.state.review}></textarea>
                            </div>

                            <div className="mt-4">
                                <ImageUploading
                                    multiple
                                    value={this.state.images}
                                    onChange={(imageList) => this.setState({ ...this.state, images: imageList })}
                                    maxNumber="5"
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
                                        // write your building UI
                                        <div className="upload__image-wrapper border-blue-400 border-2 border-dotted bg-blue-100 min-h-40 p-10 mb-3">
                                            <button
                                                style={isDragging ? { color: 'red' } : undefined}
                                                onClick={onImageUpload}
                                                {...dragProps}
                                                className="px-5"
                                            >
                                                Click or Drop here
                                            </button>
                                            &nbsp;
                                            <button onClick={onImageRemoveAll}>Remove all images</button>
                                            <div className="flex gap-2 mt-2">
                                                {imageList.map((image, index) => (
                                                    <div key={index} className="image-item">
                                                        <img src={image['data_url']} alt="" width="100" />
                                                        <div className="image-item__btn-wrapper mt-1 text-sm">
                                                            <button onClick={() => onImageUpdate(index)} className="p-1 bg-green-300 rounded mr-1">Update</button>
                                                            <button onClick={() => onImageRemove(index)} className="p-1 bg-red-300 rounded">Remove</button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </ImageUploading>
                            </div>

                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="w-32 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    onClick={this.submitReview}
                                >
                                    Post it!
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}
