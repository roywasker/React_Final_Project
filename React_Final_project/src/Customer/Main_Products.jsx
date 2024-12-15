import React ,{useState} from 'react'
import '../CSS/Main_Products.css'
import Shopping from './Shopping'
import Cart from './Cart'
import Menu_Cust from './Menu_Cust'


const Main_Products = () => {

    const [order, setOrder] = useState([{}])
    return (
        <div className='Main-container'>
            <div className='menu-container-Main'>
                <Menu_Cust />
            </div>

            <div className='Main-content' >
                <Cart order={order} setOrder={setOrder} />
            </div >

            <div className='Main-content-filter'>
                <Shopping order={order} setOrder={setOrder}/>
            </div >
        </div >
    )
}

export default Main_Products