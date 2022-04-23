import React from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

export default function ImageCard(props) {

    const { i, classNames, setOption, setId } = props;

    return (
        // modal to select image position
        <div className="w-52 m-2 relative">
            <img className="h-full" src={`${process.env.REACT_APP_URL}storage/images/${i.filename}`} />
            <Menu as="div" className="absolute right-0 top-1 z-10  text-left">
                <div>
                    <Menu.Button >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="#my-modal"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                        onClick={() => { setOption("carousel"); setId(i._id) }}
                                    >
                                        Set as Carousel
                                    </a>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="#my-modal"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                        onClick={() => { setOption("left-ad"); setId(i._id) }}
                                    >
                                        Set as Ad (left)
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="#my-modal"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                        onClick={() => { setOption("top-right-ad"); setId(i._id) }}
                                    >
                                        Set as Ad (top right)
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="#my-modal"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                        onClick={() => { setOption("bottom-right-ad"); setId(i._id) }}
                                    >
                                        Set as Ad (bottom right)
                                    </a>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="#my-modal"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                        onClick={() => { setOption("delete"); setId(i._id) }}
                                    >
                                        Delete
                                    </a>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}
