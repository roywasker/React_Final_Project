import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux'


const Menu_Cust = () => {
    const loginUser = useSelector((state) => state.users.loginUser); // store the current login user

    const navigate = useNavigate();
    const dispatch = useDispatch();


    // if any user is not login return to login page
    useEffect(() => {
        if (loginUser.userName == undefined||loginUser.admin) {
            navigate('/')
        }
    },)

    /**
     * Log out user from site
     */
    const logout = () =>{
        dispatch({ type: 'LOGOUT'})
        navigate('/')
    }

    return (
        <div>
            <div style={{width:"900px"}}>
                <Link to='/Product' style={{ color: "black", marginRight: "15%" }}>Products</Link>
                <Link to='/MyOrders' style={{ color: "black", marginRight: "15%" }}>My Orders</Link>
                <Link to='/MyAccount' style={{ color: "black", marginRight: "15%" }}>My Account</Link>
                <Link onClick={logout} style={{ color: "black"}}>Log out</Link>
            </div>
        </div>
    )
}

export default Menu_Cust