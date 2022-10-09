import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillCheckCircle } from "react-icons/ai"

const AddSuccess = () => {
    return (
        <div>
            <h2 className='text-2xl font-bold my-5 px-3'>Add Client</h2>
            <p className='px-3 font '>Client Master / Add Client / <span className='text-gray-400'>Success</span></p>
            <div className='flex justify-between items-center mx-10 mt-8 bg-white py-3 px-4 rounded-lg'>
                <div className='flex justify-center items-center gap-2'>
                    <AiFillCheckCircle className='text-[#12B690] text-xl' />
                    <h2>You have successfully added </h2>
                </div>
                <div className='flex justify-center items-center gap-3'>
                    <Link className='text-blue-600' to="/">Go to Client Master</Link>
                    <Link className='bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700' to="/addclient">Add More Clients</Link>
                </div>
            </div>
        </div>
    );
};

export default AddSuccess;