import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'


const Login = () => {

    const [user, setUser] = useState({
        userName: "",
        password: ""
    })

    const users = useSelector((state) => state.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {
        if (!user.userName || !user.password) {
            alert("Enter User name and password ")
            return
        }
        const curretUser = users.find((item) => item.userName == user.userName)
        if (curretUser && curretUser.password == user.password) {
            dispatch({ type: 'LOGIN_USER', payload: curretUser })
            if (curretUser.admin == true) {
                navigate('/menu')
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
                    <input type="text" style={{ backgroundColor: 'Silver', width: "100%", height: "25px", borderRadius: "5px" }}
                        name='user name'
                        value={user.userName}
                        onChange={e => setUser({ ...user, userName: e.target.value })} />
                    <h4 style={{ textAlign: "left" }}>Password:</h4>
                    <input type="password" style={{ backgroundColor: 'Silver', width: "100%", height: "25px", borderRadius: "5px" }}
                        name='password'
                        value={user.password}
                        onChange={e => setUser({ ...user, password: e.target.value })} />
                    <br /> <br />
                    <button style={{ backgroundColor: "DodgerBlue", color: 'white', width: "100%" }} onClick={handleLogin}>Login</button> <br /> <br />
                    <strong>New user?</strong><Link to={`/register`}> Register</Link >
                </div>

            </div>

        </div>

    )
}

export default Login