import React, { useState, useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux'


function Shopping({order , setOrder}) {

  const categories = useSelector((state) => state.categories.categories);
  const products = useSelector((state) => state.products.products);
  const users = useSelector((state) => state.users.users);

  const [productsWithBought, setProductsWithBought] = useState(products)

//  const [order, setOrder] = useState([{}])

  useEffect(() => {
    const updatedProducts = products.map((product) => {
      let counter = 0;

      product.boughtBy.forEach((row) => {
        const allowOther = users.find((user) => user.username === row.name)?.others;
        if (allowOther) {
          counter += Number(row.qty);
        }
      });

      return { ...product, bought: counter }
    });
    setProductsWithBought(updatedProducts)
  }, [products, users]);



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

  const filteredProducts = useMemo(() => {
    return productsWithBought.filter((product) => {
      const matchesCategory = filter.category === 'All' || product.category === filter.category;
      const matchesPrice = product.price <= filter.price;
      const matchesTitle = product.title.toLowerCase().includes(filter.title.toLowerCase());
      return matchesCategory && matchesPrice && matchesTitle;
    });
  }, [filter, productsWithBought]);

  const clearFilter = () => {
    setFilter({
      category: "All",
      price: maxPrice,
      title: ""
    })
  }

  const handleQtyOrder = (action, name) => {
    const productQty = productsWithBought.find((product) => product.title === name).qty
    // Find the product in the order
    const updatedOrder = order.map((product) => {
      if (product.name === name && product.qty < productQty) {
        // Update the quantity based on the action
        return { ...product, qty: action === '+' ? product.qty + 1 : product.qty - 1 }
      }
      if(product.name === name && action =='-' &&product.qty>0){
        return { ...product, qty: product.qty - 1 }
      }
      return product; // No change for other products
    });

    // If the product is not in the order, add it
    if (!updatedOrder.find((product) => product.name === name) && action == '+') {
      setOrder([...updatedOrder, { name, qty: 1 }]);
    } else {
      // Filter out products with qty 0
      const finalOrder = updatedOrder.filter((product) => product.qty > 0);
      setOrder(finalOrder);
    }
  };


  return (
    <div>
      <div style={{ backgroundColor: "gainsboro", textAlign: 'left', padding: '20px' }}>
        filter by :
        Category:
        <select name="category" style={{ width: "20%", marginLeft: "1%", marginRight: "1%" }} value={filter.category}
          onChange={e => setFilter({ ...filter, category: e.target.value })}>
          <option value="All">All</option>
          {categories.map((category) => {
            return <option value={category.name} key={category.id}>{category.name}</option>
          })}
        </select>
        Price :
        <input type="range" min="0" max={maxPrice} value={filter.price} style={{ width: '16%', marginLeft: "1%", marginRight: "1%" }} onChange={e => setFilter({ ...filter, price: Number(e.target.value) })} />
        {filter.price}$
        Title:
        <input type="text" value={filter.title} onChange={e => setFilter({ ...filter, title: e.target.value })} style={{ width: "20%", marginLeft: "1%" }} />
        <button style={{ width: '70px', marginLeft: "1%" }} onClick={clearFilter}>Clear</button>

      </div>

      <div style={{ padding: '40px' }}>
        {filteredProducts.map((product) => {
          return <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'WhiteSmoke', borderRadius: '10px', marginTop: '2%', padding: '10px' }}>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <h2 style={{ textAlign: 'left' }}>{product.title}</h2>
              <h4 style={{ textAlign: 'left' }}>{product.description}</h4>
              <h4 style={{ textAlign: 'left' }}>{product.price}$</h4>
              <h4 style={{ textAlign: 'left' }}>In stock : {product.qty}</h4>
              <button style={{ backgroundColor: 'gainsboro', marginRight: "2%" }} onClick={() => handleQtyOrder('-', product.title)}>-</button>
              <input type="text" value={order.find((item) => product.title == item.name)?.qty || 0} readOnly style={{ width: '50px', height: '40px', borderRadius: "40%", textAlign: 'center' }} />
              <button style={{ backgroundColor: 'gainsboro', marginLeft: "2%" }} onClick={() => handleQtyOrder('+', product.title)}>+</button>
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