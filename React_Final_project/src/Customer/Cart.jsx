import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../CSS/Cart.css'


const Cart = ({ order, setOrder, handleQtyOrder, setIsCartOpen, isCartOpen }) => {

  const [totlaPrice, setTotalPrice] = useState(0)
  const dispatch = useDispatch();

  const loginUser = useSelector((state) => state.users.loginUser); // store the current login user

  /**
   * Function to delete product form cart
   * @param {*} name name of the product
   */
  const handleDelOrder = (name) => {
    const modifierOrder = order.filter((product) => product.name != name)
    setOrder(modifierOrder)
  }

  /**
   * calcation total price of order
   */
  useEffect(() => {
    let sum = 0;
    order.forEach(element => {
      sum += (element.qty * element.price)
    });
    setTotalPrice(sum)
  }, [order])


  /**
   * Function to update the DB with new order
   */
  const hadleOrder = () => {
    order.forEach(element => {
      dispatch({ type: 'ADD_ORDER_PRODUCT', payload: { title: element.name, name: loginUser.userName, qty: element.qty, date: new Date().toLocaleDateString() } })
      dispatch({ type: 'ADD_ORDER_CUSTOMER', payload: { id: loginUser.id, product: element.name, qty: element.qty, total: `${element.qty * element.price}$`, date: new Date().toLocaleDateString() } })
      dispatch({ type: 'ADD_BOUGHT_PRODUCT', payload: { id: loginUser.id, name: element.name, qty: element.qty } })
    });
    setOrder([])
  }


  return (
    <>
      <div>
        <div className='cart-div1'>
          <h2 className='cart-textLeft'>Cart</h2>
          {isCartOpen && (
            <button
              onClick={() => setIsCartOpen(false)}
              className='cart-btn'>
              ←
            </button>
          )}
        </div>

        {order.map((product, index) => {
          return <div key={index} className='cart-div2'>
            <div style={{ marginLeft: '1%' }}>
              {product.name}
              <button className='cart-btn2' onClick={() => handleQtyOrder('-', product.name)}>-</button>
              {product.qty}
              <button className='cart-btn2' onClick={() => handleQtyOrder('+', product.name)}>+</button>
              {" unit - Total: "}
              {product.qty * product.price}
              <button className='cart-btn3' onClick={() => handleDelOrder(product.name)}>X</button>
            </div>
          </div>
        })}
      </div>
      <div className='cart-div3'>
        <h2>{totlaPrice > 0 ? `Total : ${totlaPrice}$ ` : null}</h2>
        {totlaPrice > 0 ? <button onClick={hadleOrder} className='cart-btn4'>Order</button> : null}
      </div>
    </>
  )
}

export default Cart