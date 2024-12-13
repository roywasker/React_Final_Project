import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, } from 'react-redux'


const Menu = () => {
    const loginUser = useSelector((state) => state.users.loginUser); // store the current login user

    const navigate = useNavigate();


    // if any user is not login return to login page
    useEffect(() => {
        if (loginUser.userName == undefined||loginUser.admin == false) {
            navigate('/')
        }
    },)

    return (
        <div>
            <h2>Hello, {loginUser.firstName} {loginUser.lastName}</h2>
            <div>
                <Link to='/categories' style={{ color: "black", marginRight: "25%" }}>categories</Link>
                <Link to='/products' style={{ color: "black", marginRight: "25%" }}>products</Link>
                <Link to='/customers' style={{ color: "black", marginRight: "25%" }}>customers</Link>
                <Link to='/statistics' style={{ color: "black" }}>statistics</Link>
            </div>
        </div>
    )
}

export default Menu