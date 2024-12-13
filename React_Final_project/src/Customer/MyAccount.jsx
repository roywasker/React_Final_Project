import React, { useState } from 'react'
import Menu_Cust from './Menu_Cust'
import '../CSS/MyAccount.css'
import { useDispatch, useSelector } from 'react-redux'


const MyAccount = () => {

    const dispatch = useDispatch();

    //get the current user log in
    const loginUser = useSelector((state) => state.users.loginUser);

    const users = useSelector((state) => state.users.users);

    //store the user data for update the data
    const [user, setUser] = useState(loginUser)

    const saveButton = () => {

        // check if user enter all the field
        if (!user.firstName || !user.lastName || !user.userName || !user.password) {
            alert('Please fill in all fields');
            return
        }

        if (user == loginUser) {
            return
        }

        //check if user is already exists
        const existUser = users.find((item) => item.userName == user.userName)
        if (existUser.id != user.id) {
            alert('User name already exists')
            return
        } 

        dispatch({ type: 'UPDATE_USER', payload: user })
    }

    return (
        <div className='myAccount-container'>
            <div className='menu-container-myAccount'>
                <Menu_Cust />
            </div>

            <div className='myAccount-content'>

                {/** update user data section */}
                <h1>My Account</h1>
                <div className='myAccount-form'>
                    <h4 className="myAccount-label">First Name:</h4>
                    <input type="text" name='first name' value={user.firstName}
                        onChange={e => setUser({ ...user, firstName: e.target.value })}
                        className='myAccount-input' />

                    {/* input for user last name*/}
                    <h4 className="myAccount-label">Last Name:</h4>
                    <input type="text" name='last name' value={user.lastName}
                        onChange={e => setUser({ ...user, lastName: e.target.value })}
                        className='myAccount-input' />

                    {/* input for user name*/}
                    <h4 className="myAccount-label">User Name:</h4>
                    <input type="text" name='user name' value={user.userName}
                        onChange={e => setUser({ ...user, userName: e.target.value })}
                        className='myAccount-input' />

                    {/* input for user password*/}
                    <h4 className="myAccount-label">Password:</h4>
                    <input type="password" name='password' value={user.password}
                        onChange={e => setUser({ ...user, password: e.target.value })}
                        className='myAccount-input' />
                    <br /><br /><strong>Allow others see my orders: </strong>
                    <input type="checkbox" name="allow others" onChange={e => setUser({ ...user, others: !user.others })} checked={user.others} /> <br /> <br />

                    {/* buttun to update user to DB*/}
                    <button className='myAccount-button' onClick={saveButton}>Save</button> <br /> <br />
                </div>
            </div>
        </div >
    )
}

export default MyAccount