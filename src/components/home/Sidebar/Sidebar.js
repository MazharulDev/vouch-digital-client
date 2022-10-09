import React from 'react';
import { Link, Outlet } from "react-router-dom"
import { AiOutlineSearch } from "react-icons/ai"
import { signOut } from 'firebase/auth';
import auth from '../../../firebase.init';
import { FiLogOut } from 'react-icons/fi'
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../../../shared/Loading';


const Sidebar = () => {
    const [user, loading, error] = useAuthState(auth);
    if (loading) {
        return <Loading />
    }
    return (
        <div>
            <div className="drawer drawer-mobile">
                <input id="sidebar" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content bg-base-200">
                    <div className='flex justify-end items-center'>
                        <label htmlFor="sidebar" className="btn btn-xs lg:hidden">Open sidebar</label>
                    </div>
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        <h2 className='text-lg mt-3 font-bold'>Company Name</h2>
                        <div className='flex justify-start items-center'>
                            <AiOutlineSearch className='absolute pl-2 text-3xl' />
                            <input className='my-4 py-2 px-1 border rounded-full pl-8' type="text" name="" placeholder='Search Modules'></input>
                        </div>
                        <p className='uppercase text-gray-500'>Client Master</p>
                        <li><Link to="/">View Clients</Link></li>
                        <li><Link to="/addclient">Add Client</Link></li>

                        <div className='absolute left-0 bottom-0 w-72'>
                            <div className='flex justify-between items-center px-3 pb-4'>
                                <div>
                                    <h2 className='font-bold text-sm'>{user?.displayName}</h2>
                                    <p className='text-xs'>{user?.email}</p>
                                </div>
                                <FiLogOut onClick={() => signOut(auth)} className='text-2xl hover:text-red-500 cursor-pointer' />
                            </div>
                        </div>


                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Sidebar;