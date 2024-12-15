import React from 'react'

const Cart = ({order , setOrder}) => {


  return (
    <div>
        <h2 style={{ textAlign: 'left'}}>Cart</h2>

        {order.map((product)=>{
            return product.name
        })}
    </div>
  )
}

export default Cart