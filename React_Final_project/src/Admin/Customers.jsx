import React, { useState } from 'react'
import Menu from './Menu';
import Table from '../Table';
import { useSelector } from 'react-redux'
import '../CSS/Customers.css'


const Customers = () => {

    //get the user list from DB
    const users = useSelector((state) => state.users.users);

    // filter the user that not admin and build the object
    const [userData, setUserData] = useState(users.filter((user) => user.admin === false)
            .map((user) => ({
                Full_Name: user.firstName+" "+user.lastName,
                Joined_At: user.joinedAt,
                Products_Bought: user.myOrder
            }))
    );
    

    return (
        <div className='customers-div-1'>
            <div className='customers-div-2'>
                <Menu />
            </div>

            <div className='customers-div-3' >
                <h1>Customers</h1>
                {<Table data={userData}/>}
            </div>
        </div>
    )
}

export default Customers