import React, { useState } from 'react'
import Menu_Cust from './Menu_Cust'
import { useSelector } from 'react-redux'
import '../CSS/MyOrder.css'
import Table from '../Table';

const MyOrder = () => {

    //get the current user log in
    const loginUser = useSelector((state) => state.users.loginUser);

    return (
        <div className='myOrder-container'>
            <div className='menu-container-myOrder'>
                <Menu_Cust />
            </div>
            
            {/** show customer order */}
            <div className='myOrder-content'>
                <h1>My Orders</h1>
                <Table data={loginUser.myOrder}/>
            </div>
        </div >
    )
}

export default MyOrder