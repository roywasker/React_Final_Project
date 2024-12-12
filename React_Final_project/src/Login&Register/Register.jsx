import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';


const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.users);


  // store user data
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    others: false,
    admin: false,
    productsBought: [{}]
  })

  /**
   * Add new user to DB
   * @returns user data
   */
  const handleAddUser = () => {

    // check if user enter all the field
    if (!user.firstName || !user.lastName || !user.userName || !user.password) {
      alert('Please fill in all fields');
      return
    }

    //check if user is already exists
    const existUser = users.find((item) => item.userName == user.userName)
    if (existUser) {
      alert('User name already exists')
    } else {
      // add user to DB
      dispatch({ type: 'ADD_USER', payload: user })
      navigate('/')
    }
  }

  return (
    <div style={{ backgroundColor: 'Gainsboro', width: "100%", padding: "50px" }}>
      <div style={{ backgroundColor: 'white', padding: "10px", borderRadius: "5px" }}>
        <h2>New User Registration</h2>

        {/* input for user first name*/}
        <h4 style={{ textAlign: "left" }}>First Name:</h4>
        <input type="text" name='first name' value={user.firstName}
          onChange={e => setUser({ ...user, firstName: e.target.value })}
          style={{ width: "90%", height: "25px", borderRadius: "5px" }} />

        {/* input for user last name*/}
        <h4 style={{ textAlign: "left" }}>Last Name:</h4>
        <input type="text" name='last name' value={user.lastName}
          onChange={e => setUser({ ...user, lastName: e.target.value })}
          style={{ width: "90%", height: "25px", borderRadius: "5px" }} />

        {/* input for user user name*/}
        <h4 style={{ textAlign: "left" }}>User Name:</h4>
        <input type="text" name='user name' value={user.userName}
          onChange={e => setUser({ ...user, userName: e.target.value })}
          style={{ width: "90%", height: "25px", borderRadius: "5px" }} />

        {/* input for user password*/}
        <h4 style={{ textAlign: "left" }}>Password:</h4>
        <input type="password" name='password' value={user.password}
          onChange={e => setUser({ ...user, password: e.target.value })}
          style={{ width: "90%", height: "25px", borderRadius: "5px" }} />
        <br /><br /><strong>Allow others see my orders: </strong>
        <input type="checkbox" name="allow others" onChange={e => setUser({ ...user, others: !user.others })} /> <br /> <br />

        {/* buttun to add user to DB*/}
        <button style={{ backgroundColor: "DodgerBlue", color: 'white', width: "90%" }} onClick={handleAddUser}>Create</button> <br /> <br />
      </div>
    </div>
  )
}

export default Register