/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { LogoutAction } from '../../../redux/actions/AuthAction'
import { Link } from 'react-router-dom'
import CategoryDropdown from '../category/CategoryDropdown'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

    const userAuth = useSelector(state => state.userAuth);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(LogoutAction());
    }

    const notification = () => {

    }

    const [search, setSearch] = useState('');

    return (
        <Disclosure as="nav" className="">
            {({ open }) => (
                <>
                    <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8 border-1 shadow bg-white">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex-shrink-0 flex items-center text-black font-bold text-2xl">
                                    {/* LOGO */}
                                    <Link to='/'>
                                        BLANK
                                    </Link>
                                </div>
                            </div>
                            <CategoryDropdown />

                            <div className="hidden md:block w-80 min-w-1/2">
                                <div>
                                    <div className="form-control">
                                        <div className="relative">
                                            <input type="text" placeholder="Search" value={search} onChange={(event) => setSearch(event.target.value)} className="w-full pr-16 h-10 input input-bordered" />
                                            <Link to={search !== '' ? `/search/${search}` : '#'}>
                                                <button className="absolute top-0 right-0 rounded-l-none btn min-h-0 h-10" >Search</button>
                                            </Link>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {userAuth.isAuthenticated ?
                                    <>
                                        <ul className="menu h-10 bg-base-100 rounded horizontal">
                                            <li>
                                                <Link to='/cart'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                </Link>
                                            </li>
                                            <li>
                                                <a>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" onClick={notification} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                                    </svg>
                                                </a>
                                            </li>

                                        </ul>



                                        <Menu as="div" className="ml-3 relative">
                                            {({ open }) => (
                                                <>
                                                    <div>
                                                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full ">
                                                            <span className="sr-only">Open user menu</span>
                                                            <img
                                                                className="h-8 w-8 rounded-full"
                                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                                alt=""
                                                            />
                                                        </Menu.Button>
                                                    </div>
                                                    <Transition
                                                        show={open}
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <Menu.Items
                                                            static
                                                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                                                        >
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link to={'/dashboard'} className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )} >Dashboard</Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <a
                                                                        onClick={logout}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100' : '',
                                                                            'block px-4 py-2 text-sm text-gray-700'
                                                                        )}
                                                                    >
                                                                        Log out
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                        </Menu.Items>
                                                    </Transition>
                                                </>
                                            )}
                                        </Menu>
                                    </>
                                    :
                                    <Link to='/login'>
                                        <button className="text-black" >Login</button>
                                    </Link>
                                }


                            </div>
                        </div>
                    </div>
                </>
            )}
        </Disclosure>
    )
}