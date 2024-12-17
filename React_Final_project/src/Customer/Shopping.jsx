import React, { useState, useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import '../CSS/Shopping.css'


function Shopping({ order, handleQtyOrder }) {

  const categories = useSelector((state) => state.categories.categories);
  const products = useSelector((state) => state.products.products);
  const users = useSelector((state) => state.users.users);

  const [productsWithBought, setProductsWithBought] = useState(products)

    /**
   * calcation the max price of all products
   */
    const maxPrice = useMemo(() => {
      return productsWithBought.reduce((max, product) => {
        const price = Number(product.price);
        return price > max ? price : max;
      }, 0);
    }, [productsWithBought]);

  const [filter, setFilter] = useState({
    category: "All",
    price: maxPrice,
    title: ""
  })

  /**
   * Update how much customer buy each products
   */
  useEffect(() => {
    const updatedProducts = products.map((product) => {
      let counter = 0;

      product.boughtBy.forEach((row) => {
        const allowOther = users.find((user) => user.userName == row.name);
        if (allowOther) {
          counter += Number(row.qty);
        }
      });
      return { ...product, bought: counter }
    });
    setProductsWithBought(updatedProducts)
  }, [products, users]);

  /**
   * filter the products by the customer input
   */
  const filteredProducts = useMemo(() => {
    return productsWithBought.filter((product) => {
      const matchesCategory = filter.category === 'All' || product.category === filter.category;
      const matchesPrice = product.price <= filter.price;
      const matchesTitle = product.title.toLowerCase().includes(filter.title.toLowerCase());
      return matchesCategory && matchesPrice && matchesTitle;
    });
  }, [filter, productsWithBought]);


  /**
   * clear filter data
   */
  const clearFilter = () => {
    setFilter({
      category: "All",
      price: maxPrice,
      title: ""
    })
  }

  return (
    <div>
      <div className='shopping-div1'>
        filter by :
        Category:
        <select name="category" className='shopping-select' value={filter.category}
          onChange={e => setFilter({ ...filter, category: e.target.value })}>
          <option value="All">All</option>
          {categories.map((category) => {
            return <option value={category.name} key={category.id}>{category.name}</option>
          })}
        </select>
        Price :
        <input type="range" min="0" max={maxPrice} value={filter.price} className='shopping-input1' onChange={e => setFilter({ ...filter, price: Number(e.target.value) })} />
        {filter.price}$
        Title:
        <input type="text" value={filter.title} onChange={e => setFilter({ ...filter, title: e.target.value })} className='shopping-input2' />
        <button className='shopping-btn' onClick={clearFilter}>Clear</button>

      </div>

      <div style={{ padding: '40px' }}>
        {filteredProducts.map((product) => {
          return <div key={product.id} className='shopping-div2'>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <h2 style={{ textAlign: 'left' }}>{product.title}</h2>
              <h4 style={{ textAlign: 'left' }}>{product.description}</h4>
              <h4 style={{ textAlign: 'left' }}>{product.price}$</h4>
              <h4 style={{ textAlign: 'left' }}>In stock : {product.qty}</h4>
              <button className='shopping-btn2' onClick={() => handleQtyOrder('-', product.title)}>-</button>
              <input type="text" value={order.find((item) => product.title == item.name)?.qty || 0} readOnly className='shopping-input3'/>
              <button className='shopping-btn2' onClick={() => handleQtyOrder('+', product.title)}>+</button>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <img src={product.linkToPic} alt={product.title} style={{ width: "200px", height: "200px" }} />
            </div>
            <div style={{ flex: 1, textAlign: 'right' }}>
              <h4 style={{ textAlign: 'left' }}>Bought : {product.bought} </h4>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default Shopping