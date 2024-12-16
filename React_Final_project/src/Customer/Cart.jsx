import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'


const Cart = ({ order, setOrder, handleQtyOrder }) => {

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
      dispatch({ type: 'ADD_ORDER_PRODUCT', payload: { title: element.name , name: loginUser.userName, qty: element.qty, date: new Date().toLocaleDateString() } })
      dispatch({ type: 'ADD_ORDER_CUSTOMER', payload: { id: loginUser.id , product: element.name, qty: element.qty, total: `${element.qty * element.price}$`, date: new Date().toLocaleDateString() } })
      dispatch({ type: 'ADD_BOUGHT_PRODUCT', payload: { id: loginUser.id ,name: element.name, qty: element.qty } })
    });
    setOrder([])
  }


  return (
    <>
      <div>
        <h2 style={{ textAlign: 'left' }}>Cart</h2>
        {order.map((product, index) => {
          return <div key={index} style={{ backgroundColor: "lightgray", borderRadius: '10px', height: '50px', textAlign: 'left', marginBottom: '3%' }}>
            <div style={{ marginLeft: '1%' }}>
              {product.name}
              <button style={{ backgroundColor: 'gainsboro', marginRight: "2%", marginLeft: "2%", border: '1px solid black', marginTop: '4px' }} onClick={() => handleQtyOrder('-', product.name)}>-</button>
              {product.qty}
              <button style={{ backgroundColor: 'gainsboro', marginLeft: "2%", border: '1px solid black', marginTop: '4px' }} onClick={() => handleQtyOrder('+', product.name)}>+</button>
              {" unit - Total: "}
              {product.qty * product.price}
              <button style={{ backgroundColor: 'LightCoral', color: 'white', marginLeft: "4%", border: '1px solid black', marginTop: '4px', borderRadius: '30px' }} onClick={() => handleDelOrder(product.name)}>X</button>
            </div>
          </div>
        })}
      </div>
      <div style={{ textAlign: 'left', marginTop: '10%' }}>
        <h2>{totlaPrice > 0 ? `Total : ${totlaPrice}$ ` : null}</h2>
        {totlaPrice > 0 ? <button onClick={hadleOrder} style={{ backgroundColor: 'green', color: 'white', borderRadius: '20px' }}>Order</button> : null}
      </div>
    </>
  )
}

export default Cart