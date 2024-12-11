import React, { useState ,useEffect } from 'react';
import Menu from './Menu';
import { useSelector } from 'react-redux';
import Product from './Product';

const Products = () => {
    const products = useSelector((state) => state.products.products);

    const [addNew, setAddNew] = useState(false);

    const emptyProduct = {
        title: "",
        category: "",
        description: "",
        price: "",
        linkToPic: "",
        boughtBy: [{}],
    };

    useEffect(() => {
      setAddNew(false)
    }, [products])
    

    const handleAddNew = () => {
        setAddNew(!addNew);
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ position: 'absolute', top: 0, left: '40%' }}>
                <Menu />
            </div>

            <div style={{ backgroundColor: 'LightGray', width: '800px', padding: '20px', marginLeft: '20%' ,marginTop: '100px'}}>
                <h1 style={{ textAlign: 'left' }}>Products</h1>

                {products.map((product, index) => (
                    <Product key={index} data={product} status="update" />
                ))}

                <button style={{ backgroundColor: 'DodgerBlue', color: 'white', marginTop: '20px', padding: '10px 15px' }}
                    onClick={handleAddNew}>Add New</button>

                {addNew && <Product data={emptyProduct} status="add" />}
            </div>
        </div>
    );
};

export default Products;
