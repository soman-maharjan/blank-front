/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { LogoutAction } from '../../../redux/actions/AuthAction'
import { Link } from 'react-router-dom'
import CategoryDropdown from '../category/CategoryDropdown'
import { GlobeIcon, ShoppingCartIcon, BellIcon } from '@heroicons/react/outline'

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
                    <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8 border-1 shadow bg-white ">
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
                                        <form>
                                            <div className="relative">
                                                <input type="text" placeholder="Search" value={search} onChange={(event) => setSearch(event.target.value)} className="pl-5 border-2 pr-16 h-10 focus:none focus:ring-indigo-500 outline-none focus:border-indigo-500 flex-1 block w-full  sm:text-sm border-gray-300" />
                                                <Link to={search !== '' ? `/search/${search}` : '#'}>
                                                    <button type="submit" className="absolute rounded-none top-0 right-0 rounded-l-none btn min-h-0 h-10 bg-indigo-600 hover:bg-indigo-700 border-none" >Search</button>
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <ul className="menu h-10 bg-base-100 rounded horizontal">
                                    <li>
                                        <Link to='/feed'>
                                            <GlobeIcon className="h-6 w-6" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/cart'>
                                            <ShoppingCartIcon className="h-6 w-6" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/'>
                                            <BellIcon className="h-6 w-6" onClick={notification} />
                                        </Link>
                                    </li>
                                </ul>
                                {userAuth.isAuthenticated ?
                                    <>
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
                                                                    <Link to={'/account-dashboard'} className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )} >My Account</Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link to={'/seller-dashboard'} className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )} >Seller Dashboard</Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link to={'/admin-dashboard'} className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )} >Admin Dashboard</Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <a
                                                                        onClick={logout}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100' : '',
                                                                            'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
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