import React, { useState } from 'react'
import Menu from './Menu';
import Table from '../Table';
import { useSelector } from 'react-redux'


const Customers = () => {

    //get the user list from DB
    const users = useSelector((state) => state.users.users);

    // filter the user that not admin and build the object
    const [userData, setUserData] = useState(users.filter((user) => user.admin === false)
            .map((user) => ({
                Full_Name: user.firstName+" "+user.lastName,
                Joined_At: user.joinedAt,
                Products_Bought: user.productsBought
            }))
    );
    

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ position: 'absolute', top: 0, left: '40%' }}>
                <Menu />
            </div>

            <div style={{ backgroundColor: 'LightGray', width: '800px', padding: '20px', marginLeft: '20%', marginTop: '100px' }}>
                <h1>Customers</h1>
                {<Table data={userData}/>}
            </div>
        </div>
    )
}

export default Customers