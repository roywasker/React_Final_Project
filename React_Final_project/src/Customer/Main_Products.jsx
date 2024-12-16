import React, { useState } from 'react'
import '../CSS/Main_Products.css'
import Shopping from './Shopping'
import Cart from './Cart'
import Menu_Cust from './Menu_Cust'
import { useSelector } from 'react-redux'

const Main_Products = () => {

    // store cart 
    const [order, setOrder] = useState([])
    const products = useSelector((state) => state.products.products);

    /**
     * Change the amount of products in the cart
     * @param {*} action Increase or decrease the amount of products
     * @param {*} name name of the product
     */
    const handleQtyOrder = (action, name) => {

        const productToOrder = products.find((product) => product.title === name)
        const productQty = productToOrder.qty
        const productPrice = productToOrder.price
        // Find the product in the order
        const updatedOrder = order.map((product) => {
            if (product.name === name && product.qty < productQty) {
                // Update the quantity based on the action
                return { ...product, qty: action === '+' ? product.qty + 1 : product.qty - 1 }
            }
            if (product.name === name && action == '-' && product.qty > 0) {
                return { ...product, qty: product.qty - 1 }
            }
            return product; // No change for other products
        });

        // If the product is not in the order, add it
        if (!updatedOrder.find((product) => product.name === name) && action == '+') {
            setOrder([...updatedOrder, { name, qty: 1 , price: productPrice}]);
        } else {
            // Filter out products with qty 0
            const finalOrder = updatedOrder.filter((product) => product.qty > 0);
            setOrder(finalOrder);
        }
    };

    return (
        <div className='Main-container'>
            <div className='menu-container-Main'>
                <Menu_Cust />
            </div>

            <div className='Main-content' >
                <Cart order={order} setOrder={setOrder} handleQtyOrder={handleQtyOrder} />
            </div >

            <div className='Main-content-filter'>
                <Shopping order={order} setOrder={setOrder} handleQtyOrder={handleQtyOrder} />
            </div >
        </div >
    )
}

export default Main_Products