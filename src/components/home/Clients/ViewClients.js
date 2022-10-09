import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Client from './Client';
import axios from 'axios';

const ViewClients = () => {
    const navigate = useNavigate()
    const [clients, setClients] = useState([]);
    useEffect(() => {
        const getEmail = async () => {
            const url = `http://localhost:5000/clients`
            try {
                const { data } = await axios.get(url, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setClients(data)

            }
            catch (error) {
                if (error.response.status === 401 || error.response.status === 403) {
                    navigate('/login')
                    signOut(auth);
                }
            }
        }
        getEmail()
    }, [navigate])
    return (
        <div>
            <h2 className='text-2xl font-bold my-5 px-3'>View client</h2>
            <p className='px-3 font '>Client Master / <span className='text-gray-400'>View Clients</span></p>
            <div className='flex justify-start items-center mx-5'>
                <AiOutlineSearch className='absolute pl-2 text-3xl' />
                <input className='my-4 py-2 px-1 border rounded-full pl-8' type="text" name="" placeholder='Search Modules'></input>
            </div>
            <div>

                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Email Address</th>
                            <th>Phone No.</th>
                            <th>Contact Person</th>
                            <th>Facilitator</th>
                            <th>Sites</th>
                            <th>Tenants</th>
                            <th>Tenants Groups</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            clients.map(client =>
                                <Client client={client} key={client._id} />
                            )
                        }
                    </tbody>



                </table>


            </div>
        </div>
    );
};

export default ViewClients;
