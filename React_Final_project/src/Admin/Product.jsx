import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Table from '../Table';
import '../CSS/Product.css'

const Product = ({ data, status }) => {

    const [updateProduct, setUpdateProduct] = useState(data)

    //get all categories and product form DB
    const categories = useSelector((state) => state.categories.categories);
    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();

    /**
     * Function to Add/Update product data
     * @returns 
     */
    const handleButton = () => {

        //check that all the filed in filled
        if (updateProduct.title == "" || updateProduct.category == "" || updateProduct.description == "" || updateProduct.price == "" || updateProduct.linkToPic == "") {
            alert("Fill all the field")
            return
        }
        // if user dont update data do noting
        if (updateProduct == data) {
            return
        }


        const findproduct = products.find((product) => product.title == updateProduct.title)

        // check that user dont enter 2 product with same title
        if (findproduct != undefined && updateProduct.id != findproduct.id) {
            alert("The product is alrady exists")
            return
        }

        if (status == "add") {
            dispatch({ type: 'ADD_PRODUCTS', payload: updateProduct })
        } else {
            dispatch({ type: 'UPDATE_PRODUCTS', payload: updateProduct })
        }

    }
    return (
        <div className='product-container'>

            {/* Show all the data of the product */}
            <div className='small-product-container'>
                <div className='product-left'>
                    <strong>Title: </strong>
                    <input type="text" value={updateProduct.title} onChange={e => setUpdateProduct({ ...updateProduct, title: e.target.value })} /> <br /> <br />

                    <strong>Category: </strong>
                    <select name="category" style={{ width: "40%" }} value={updateProduct.category}
                        onChange={e => setUpdateProduct({ ...updateProduct, category: e.target.value })}>
                        {status == "add" ? <option value="empty"></option> : null}
                        {categories.map((category) => {
                            return <option value={category.name} key={category.id}>{category.name}</option>
                        })}
                    </select> <br /> <br />

                    <strong>Description: </strong> <br />
                    <textarea id="description" rows="5" cols="40" value={updateProduct.description} onChange={e => setUpdateProduct({ ...updateProduct, description: e.target.value })}></textarea> <br /> <br />

                    <button className='product-button' onClick={handleButton}> {status === "add" ? "Add Product" : "Save"}</button>

                </div>

                <div className='product-right'>
                    <div className='text-left'>
                        <strong className='text-left'>Price: </strong>
                        <input type="number" value={updateProduct.price} onChange={e => setUpdateProduct({ ...updateProduct, price: e.target.value })} /> <br /> <br />

                        <strong className='text-left'>Link to Pic: </strong>
                        <input type="text" value={updateProduct.linkToPic} onChange={e => setUpdateProduct({ ...updateProduct, linkToPic: e.target.value })} /> <br /> <br />

                        <strong className='text-left'>Qty: </strong>
                        <input type="number" value={updateProduct.qty} onChange={e => setUpdateProduct({ ...updateProduct, qty: e.target.value })} /> <br /> <br />

                        <strong className='text-left'>Bought By: </strong>
                        <Table data={updateProduct.boughtBy} />

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Product