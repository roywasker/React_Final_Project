import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import { useSelector } from 'react-redux';
import Product from './Product';
import '../CSS/Products.css'

const Products = () => {

    // get all the product from DB
    const products = useSelector((state) => state.products.products);

    const [addNew, setAddNew] = useState(false);

    // Empty product object for add new one
    const emptyProduct = {
        title: "",
        category: "",
        description: "",
        price: "",
        linkToPic: "",
        boughtBy: [{}],
    };

    //after add new product close windows of add new product
    useEffect(() => {
        setAddNew(false)
    }, [products])


    const handleAddNew = () => {
        setAddNew(!addNew);
    };

    return (
        <div className='div-1'>
            <div className='div-2'>
                <Menu />
            </div>

            <div className='div-3'>
                <h1 className='text'>Products</h1>

                {/* Show all the product form list */}
                {products.map((product, index) => (
                    <Product key={index} data={product} status="update" />
                ))}

                <button className='button-style'onClick={handleAddNew}>Add New</button>
                {addNew && <Product data={emptyProduct} status="add" />}
            </div>
        </div>
    );
};

export default Products;
