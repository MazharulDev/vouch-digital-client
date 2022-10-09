import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdKeyboardArrowRight } from "react-icons/md"
import { BsPlusSquareDotted } from "react-icons/bs"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddClient = () => {
    const [Loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        setLoading(true)
        const img = data.image[0];
        const formData = new FormData();
        formData.append('image', img);
        const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData

        })
            .then(res => res.json())
            .then(result => {
                const img = result?.data.url;
                const client = {
                    companyName: data.companyName,
                    companyWeb: data.website,
                    businessCategory: data.businessCategory,
                    selectFacility: data.selectFacility,
                    companyEmail: data.companyEmail,
                    mobileNumber: data.mobileNumber,
                    selectState: data.selectState,
                    selectCity: data.selectCity,
                    pinCode: data.pinCode,
                    gstNumber: data.gstNumber,
                    faxNumber: data.faxNumber,
                    img: img
                }
                //send database
                fetch('http://localhost:5000/clients', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(client)
                })
                    .then(res => res.json())
                    .then(output => {
                        setLoading(false)
                        if (output.insertedId) {
                            navigate("/clientaddsuccess")
                        } else {
                            toast.error("Client Add Failed")
                        }
                    })
            })
    }
    return (
        <div>
            <h2 className='text-2xl font-bold my-5 px-3'>Add Client</h2>
            <p className='px-3 font '>Client Master / Add Client / <span className='text-gray-400'>Create profile</span></p>
            <div className='m-5 mt-8 bg-white rounded-lg p-4'>
                <h2 className='text-lg font-bold'>Create a profile</h2>
                <p>Add some basic information to related the client</p>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mx-10 mt-8 flex justify-start items-center gap-6'>

                            <label className="label">
                                <BsPlusSquareDotted className='text-5xl' />
                                <input

                                    className='hidden'
                                    type="file"
                                    {...register("image")}
                                />
                            </label>
                            <div>
                                <h2 className='text-lg'>Company Logo</h2>
                                <p className='text-sm'>Logo ratio should be 1:1 and sould be 120*120</p>
                            </div>


                        </div>
                        <div className='grid grid-cols-2 gap-4 mx-10 mt-8'>
                            <input className='p-2 rounded-md bg-white border' type="text" {...register("companyName", { required: true })} placeholder="Company Name *" />
                            <input className='p-2 rounded-md bg-white border' type="text" {...register("website")} placeholder="Website" />
                        </div>
                        <div className='grid grid-cols-2 gap-4 mx-10 mt-4'>
                            <select className='p-2 rounded-md bg-white border ' {...register("businessCategory", { required: true })}>
                                <option disabled selected >Select Business Category *</option>
                                <option value="Automotive ">Automotive </option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Education ">Education </option>
                                <option value="Home & Garden ">Home & Garden </option>
                            </select>
                            <select className='p-2 rounded-md bg-white border' {...register("selectFacility", { required: true })}>
                                <option disabled selected  >Select Facility Management Company *</option>
                                <option value="Office Assistants">Office Assistants</option>
                                <option value="Front Office/Receptionist">Front Office/Receptionist</option>
                                <option value="Office Assistants">Office Assistants</option>
                                <option value="Accounts Assistants">Accounts Assistants</option>
                            </select>

                        </div>
                        <div className='grid grid-cols-2 gap-4 mx-10 mt-8'>
                            <input className='p-2 rounded-md bg-white border' type="text" {...register("companyEmail", { required: true })} placeholder="Company Email Address *" />
                            <input className='p-2 rounded-md bg-white border' type="text" {...register("mobileNumber", { required: true })} placeholder="Mobile Number *" />
                        </div>
                        <div className='grid grid-cols-5 gap-4 mx-10 mt-4'>
                            <select className='p-2 rounded-md bg-white border col-span-2' {...register("selectState", { required: true })}>
                                <option disabled selected  >Select State *</option>
                                <option value="Hyderabad">Hyderabad</option>
                                <option value="Assam">Assam</option>
                                <option value="Bombay">Bombay</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Gujarat">Gujarat</option>
                            </select>
                            <select className='p-2 rounded-md bg-white border col-span-2' {...register("selectCity", { required: true })}>
                                <option disabled selected  >Select City *</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Bangalore">Bangalore</option>
                                <option value="Kolkata">Kolkata</option>
                                <option value="Chennai">Chennai</option>
                            </select>
                            <input className='p-2 rounded-md bg-white border col-span-1' type="number" {...register("pinCode", { required: true })} placeholder="Pincode *" />
                        </div>
                        <div className='grid grid-cols-2 gap-4 mx-10 mt-8'>
                            <input className='p-2 rounded-md bg-white border' type="text" {...register("gstNumber", { required: true })} placeholder="GST Number *" />
                            <input className='p-2 rounded-md bg-white border' type="text" {...register("faxNumber")} placeholder="Fax Number" />
                        </div>
                        {
                            Loading ? <p className='mx-5 text-2xl font-bold p-3'>Loading...</p> : <div className='flex justify-start items-center px-3 gap-3 py-2 bg-blue-800 hover:bg-blue-700 text-white mx-10 mt-4 rounded-lg cursor-pointer w-48'>
                                <input className='cursor-pointer' type="submit" value="Save & Continue" />
                                <MdKeyboardArrowRight />
                            </div>
                        }
                    </form>
                </div>
            </div>

        </div>
    );
};

export default AddClient;