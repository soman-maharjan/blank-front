/* This example requires Tailwind CSS v2.0+ */
import {Fragment, useState} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {useDispatch, useSelector} from 'react-redux'
import {LogoutAction} from '../../../redux/actions/AuthAction'
import {Link} from 'react-router-dom'
import CategoryDropdown from '../category/CategoryDropdown'
import {GlobeIcon, ShoppingCartIcon} from '@heroicons/react/outline'
import DefaultImage from '../../images/default.jpg';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

    const userAuth = useSelector(state => state.userAuth);
    const userProfile = useSelector(state => state.userDetails.userProfile);

    const dispatch = useDispatch();

    const logout = () => {
        dispatch(LogoutAction());
    }

    const notification = () => {

    }

    const [search, setSearch] = useState('');

    return (
        <Disclosure as="nav" className="">
            {({open}) => (
                <>
                    <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8 border-1 shadow bg-white ">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div
                                    className="flex-shrink-0 flex items-center text-black font-bold text-2xl text-indigo-600">
                                    {/* LOGO */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                                    </svg>
                                    <Link to='/home'>
                                        Ecommerce
                                    </Link>
                                </div>
                            </div>
                            <CategoryDropdown/>
                            <div className="hidden md:block w-80 min-w-1/2">
                                <div>
                                    <div className="form-control">
                                        <form>
                                            <div className="relative">
                                                <input type="text" placeholder="Search" value={search}
                                                       onChange={(event) => setSearch(event.target.value)}
                                                       className="pl-5 border-2 pr-16 h-10 focus:none focus:ring-indigo-500 outline-none focus:border-indigo-500 flex-1 block w-full  sm:text-sm border-gray-300"/>
                                                <Link to={search !== '' ? `/search/${search}` : '#'}>
                                                    <button type="submit"
                                                            className="absolute rounded-none top-0 right-0 rounded-l-none btn min-h-0 h-10 bg-indigo-500 hover:bg-indigo-600 border-none">Search
                                                    </button>
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <div className="flex gap-9 mt-1">
                                    <Link to='/feed'>
                                        <GlobeIcon className="h-6 w-6"/>
                                    </Link>
                                    <Link to='/cart'>
                                        <ShoppingCartIcon className="h-6 w-6"/>
                                    </Link>
                                    {/*<Popover className="relative">*/}
                                    {/*    <>*/}
                                    {/*        <Popover.Button>*/}
                                    {/*            <BellIcon className="h-6 w-6" onClick={notification}/>*/}
                                    {/*        </Popover.Button>*/}
                                    {/*        <Transition*/}
                                    {/*            as={Fragment}*/}
                                    {/*            enter="transition ease-out duration-200"*/}
                                    {/*            enterFrom="opacity-0 translate-y-1"*/}
                                    {/*            enterTo="opacity-100 translate-y-0"*/}
                                    {/*            leave="transition ease-in duration-150"*/}
                                    {/*            leaveFrom="opacity-100 translate-y-0"*/}
                                    {/*            leaveTo="opacity-0 translate-y-1"*/}
                                    {/*        >*/}
                                    {/*            <Popover.Panel*/}
                                    {/*                className="right-0 absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-3/4 left-1/2 sm:px-0">*/}
                                    {/*                <div*/}
                                    {/*                    className="bg-white overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">*/}
                                    {/*                    <div className="relative grid gap-2 bg-white px-7 py-4">*/}
                                    {/*                        <a href="#">Analytics</a>*/}
                                    {/*                        <a href="#">Engagement</a>*/}
                                    {/*                        <a href="#">Security</a>*/}
                                    {/*                        <a href="#">Integrations</a>*/}
                                    {/*                    </div>*/}
                                    {/*                </div>*/}
                                    {/*            </Popover.Panel>*/}
                                    {/*        </Transition>*/}
                                    {/*    </>*/}
                                    {/*</Popover>*/}
                                    {userAuth.isAuthenticated ?
                                        <>
                                            <Menu as="div" className="relative -mt-1">
                                                {({open}) => (
                                                    <>
                                                        <div>
                                                            <Menu.Button className=" flex text-sm rounded-full ">
                                                                <span className="sr-only">Open user menu</span>
                                                                <img
                                                                    className="h-8 w-8 rounded-full"
                                                                    src={DefaultImage}
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
                                                                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                                                            >
                                                                <Menu.Item>
                                                                    {({active}) => (
                                                                        <Link to={'/account-dashboard'}
                                                                              className={classNames(
                                                                                  active ? 'bg-gray-100' : '',
                                                                                  'block px-4 py-2 text-sm text-gray-700'
                                                                              )}>My Account</Link>
                                                                    )}
                                                                </Menu.Item>
                                                                {userProfile.roles && userProfile.roles.includes('seller') ?
                                                                    <Menu.Item>
                                                                        {({active}) => (
                                                                            <Link to={'/seller-dashboard'}
                                                                                  className={classNames(
                                                                                      active ? 'bg-gray-100' : '',
                                                                                      'block px-4 py-2 text-sm text-gray-700'
                                                                                  )}>Seller Dashboard</Link>
                                                                        )}
                                                                    </Menu.Item> : null}
                                                                {userProfile.roles && userProfile.roles.includes('admin') ?
                                                                    <Menu.Item>
                                                                        {({active}) => (
                                                                            <Link to={'/admin-dashboard'}
                                                                                  className={classNames(
                                                                                      active ? 'bg-gray-100' : '',
                                                                                      'block px-4 py-2 text-sm text-gray-700'
                                                                                  )}>Admin Dashboard</Link>
                                                                        )}
                                                                    </Menu.Item> : null}

                                                                <Menu.Item>
                                                                    {({active}) => (
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
                                            <button className="text-black">Login</button>
                                        </Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Disclosure>
    )
}