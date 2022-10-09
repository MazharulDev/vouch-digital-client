import React from 'react';
import { BsThreeDotsVertical } from "react-icons/bs"

const Client = ({ client }) => {
    const { img, companyName, companyEmail, mobileNumber, gstNumber } = client
    return (
        <tr>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={img} alt="Company logo" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{companyName}</div>
                    </div>
                </div>
            </td>
            <td>{companyEmail}</td>
            <td>{mobileNumber}</td>
            <td>--</td>
            <td>--</td>
            <td>{gstNumber}</td>
            <td>--</td>
            <td>--</td>
            <td>
                <BsThreeDotsVertical />
            </td>

        </tr>
    );
};

export default Client;