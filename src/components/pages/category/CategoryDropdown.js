import axios from 'axios'
import React, { PureComponent } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

class CategoryDropdown extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            categories: [],
            data: []
        }
    }

    componentDidMount() {
        axios.get('/api/category')
            .then(response => this.setState({ categories: response.data }))
            .catch(error => console.log(error))
    }

    render() {

        return (

            <div className="">
                <Popover className="relative">
                    {({ open }) => (
                        <>
                            <Popover.Button
                                className={`
                ${open ? '' : 'text-opacity-90'}
                text-white group bg-orange-700 px-3 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                            >
                                <span className="text-black">Categories </span>
                                <ChevronDownIcon
                                    className="h-5 w-5 text-black pt-1"
                                    aria-hidden="true"
                                />

                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/4 shadow left-1/2 sm:px-0 lg:max-w-3xl">
                                    <div className="flex flex-col flex-wrap h-52 bg-white mt-1">
                                        {this.state.categories.map(cat =>
                                            <div className="list-with-heading mb-5 mt-2">
                                                <Link to={`/category/${cat.title}`}><h3 className="font-semibold">{cat.title}</h3></Link>
                                                <ul>
                                                    {this.state.categories.map(c => (c.parent === cat.title ? <Link to={`/category/${c.title}`}><li>{c.title}</li></Link> : null))}

                                                </ul>
                                            </div>
                                        )
                                        }
                                    </div >
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>
            </div>

        )
    }
}

export default CategoryDropdown;


