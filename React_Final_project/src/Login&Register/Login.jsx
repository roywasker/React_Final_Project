import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import '../CSS/Login.css'


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
            }else{
                navigate('/Product')
            }
        } else {
            alert("User name or password is incorrect")
        }
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Next Generation E-Commerce</h2>
                <div>
                    <h4 className="login-label">User name:</h4>
                    <input
                        type="text"
                        className="login-input"
                        name="user name"
                        value={user.userName}
                        onChange={(e) => setUser({ ...user, userName: e.target.value })}
                    />
                    <h4 className="login-label">Password:</h4>
                    <input
                        type="password"
                        className="login-input"
                        name="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                    <button className="login-button" onClick={handleLogin}>
                        Login
                    </button>
                    <div>
                        <strong>New user?</strong>
                        <Link to="/register">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login