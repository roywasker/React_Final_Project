import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'


const Login = () => {

    //store user data
    const [user, setUser] = useState({
        userName: "",
        password: ""
    })

    const users = useSelector((state) => state.users.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    /**
     * login user to website
     * @returns user data
     */
    const handleLogin = () => {

        // check if user enter user name and password
        if (!user.userName || !user.password) {
            alert("Enter User name and password ")
            return
        }

        const curretUser = users.find((item) => item.userName == user.userName) // find this user

        // check if the user and password is correct 
        if (curretUser && curretUser.password == user.password) {

            // set this user to be the login user
            dispatch({ type: 'LOGIN_USER', payload: curretUser })

            //if he have admin permissions go to admin panel
            if (curretUser.admin == true) {
                navigate('/categories')
            }
        } else {
            alert("User name or password is incorrect")
        }
    }

    return (
        <div style={{ backgroundColor: 'Gainsboro', width: "100%", padding: "50px" }}>
            <div style={{ border: "1px solid gray", borderRadius: "10px" }}>
                <h2>Next Generation E-Commerce</h2>
                <div style={{ padding: "50px" }}>
                    <h4 style={{ textAlign: "left" }}>User name:</h4>

                    {/* input to enter user name */}
                    <input type="text" style={{ backgroundColor: 'Silver', width: "100%", height: "25px", borderRadius: "5px" }}
                        name='user name'
                        value={user.userName}
                        onChange={e => setUser({ ...user, userName: e.target.value })} />
                    <h4 style={{ textAlign: "left" }}>Password:</h4>

                    {/* input to enter password */}
                    <input type="password" style={{ backgroundColor: 'Silver', width: "100%", height: "25px", borderRadius: "5px" }}
                        name='password'
                        value={user.password}
                        onChange={e => setUser({ ...user, password: e.target.value })} />
                    <br /> <br />

                    {/* button to login*/}
                    <button style={{ backgroundColor: "DodgerBlue", color: 'white', width: "100%" }} onClick={handleLogin}>Login</button> <br /> <br />

                    {/* link to go Register page */}
                    <strong>New user?</strong><Link to={`/register`}> Register</Link >
                </div>

            </div>

        </div>

    )
}

export default Login