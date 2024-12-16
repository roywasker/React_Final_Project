import React, { useMemo, useState } from 'react';
import Menu from './Menu';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import '../CSS/Statistics.css'

const Statistics = () => {

  // get customers and product from DB
  const users = useSelector((state) => state.users.users);
  const products = useSelector((state) => state.products.products);

  const [customers,setCustomers] = useState(users.filter((user)=> user.admin == false))
  const [currentUser,setCurrentUser] = useState(customers[0])
  

  /**
   * Calculates all products sold
   */
  const dataOfProduct = useMemo(() => {

    //for all product sum all the sold qty
    return products.map((product) => {
      let counter = 0;
      if (product.boughtBy && Array.isArray(product.boughtBy)) {
        product.boughtBy.forEach((row) => {
          counter += Number(row.qty) || 0;
        });
      }
      return {
        name: product.title,
        value: counter,
      };
    });
  }, [products])

  /**
   * Calculates all products a customer has bought
   */
  const dataOfCustomers = useMemo(() => {

    //for all product save the qtr
    return currentUser.productsBought.map((row)=>{
      return {
        name: row.name,
        value: row.qty,
      };
    })

  }, [currentUser])

  //set color for the Chart 
  const COLORS = ['#FF6347', '#4682B4', '#FFD700', '#32CD32', '#8A2BE2'];

  return (
    <div className='statistics-div-1'>
      <div className='statistics-div-2'>
        <Menu />
      </div>

      <div className='statistics-div-3'>
        <h1>Statistics</h1>

        <div className='statistics-div-4'>
          {/* left graph*/}
          <div className='left-graph'>
            <select name="customers selection" className='select-style' 
            onChange={(e) => setCurrentUser(customers.find(user => user.id == e.target.value))}
            value={currentUser.id}>
              {customers.map((customer)=>{
                return <option  key={customer.id} value={customer.id}>{customer.userName}</option>
              })}
            </select>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataOfCustomers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                  {dataOfCustomers.map((product, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/*right graph */}
          <div className='right-graph'>
            <PieChart width={450} height={450}>
              <Pie
                data={dataOfProduct}
                dataKey="value"
                nameKey="name"
                outerRadius={150}
                fill="#8884d8"
                label={({ name, value }) => `${name} ${value}`}>
                {dataOfProduct.map((product, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
