import React, { useState } from 'react'
import Menu from './Menu'
import { useSelector, useDispatch } from 'react-redux'
import '../CSS/Categories.css'

const Categories = () => {

    const categories = useSelector((state) => state.categories.categories);
    const dispatch = useDispatch();

    const [newcategory, setNewCategory] = useState({ name: "" }) // store the name of new categories
    const [updatecategory, setUpdateCategory] = useState({ name: "", newName: "" }) // store the name and the new name of categories that user when to update


    /**
     * Add new categories to DB
     * @returns 
     */
    const handleAddNewCategory = () => {

        //check if the name is not empty
        const findCategory = categories.find((item) => item.name == newcategory.name)
        if (newcategory.name == "") {
            alert("Category name cannot be empty!");
            return

            //check if is already exists categories with this name
        } else if (findCategory != undefined && findCategory.name == newcategory.name) {
            alert("Categoryis already exists!");
            return
        }

        dispatch({ type: 'ADD_CATEGORY', payload: newcategory })

        //reset the state
        setNewCategory({ name: "" })
        setUpdateCategory({ name: "", newName: "" })
    }


    /**
     * delete category from DB
     * @param {*} category category name to delete
     */
    const handleDeleteCategory = (category) => {
        dispatch({ type: 'DELETE_CATEGORY', payload: category.id })
        setUpdateCategory({ name: "", newName: "" }) // reset the state
    }


    /**
     * Update category name
     * @param {*} category category to update
     * @returns 
     */
    const handleUpdateCategory = (category) => {

        // if user click first time on update button
        if (updatecategory.name != category.name) {
            setUpdateCategory({ ...updatecategory, name: category.name, newName: category.name })


        } else {
            // if user change the category name
            if (updatecategory.name != updatecategory.newName) {

                const findCategory = categories.find((item) => item.name == updatecategory.newName)

                //check if the name is not empty
                if (updatecategory.newName == "") {
                    alert("Category name cannot be empty!");
                    return

                    //check if is already exists categories with this name
                } else if (findCategory != undefined && findCategory.name == updatecategory.newName) {
                    alert("Category is already exists!");
                    return
                }
                dispatch({ type: 'UPDATE_CATEGORY', payload: { id: category.id, name: updatecategory.newName } })

                // if user dont change the name
            } else {
                //rest the state and dont update the DB
                setUpdateCategory({ name: "", newName: "" })
            }
        }
    }

    return (
        <div className='categories-container'>
            <div className='menu-container'>
                <Menu />
            </div>

            {/* Categories content below Menu */}
            <div className='categories-content'>
                <h1  className='categories-title'>Categories</h1>
                <div className='categories-list'>
                    {categories.map((category) => (
                        <div key={category.id} className='category-item'>
                            {updatecategory.name === category.name ? (
                                <input type="text" value={updatecategory.newName} className='text-input'
                                    onChange={e => setUpdateCategory({ ...updatecategory, newName: e.target.value })}/>
                            ) : (
                                <h2 className='h2-style'>{category.name}</h2>
                            )}
                            <button className='button-update' onClick={() => handleUpdateCategory(category)}>Update</button>
                            <button className='button-remove' onClick={() => handleDeleteCategory(category)}>Remove</button>
                        </div>
                    ))}
                    <input type="text" name='new category'
                        className='category-input'
                        value={newcategory.name}
                        onChange={e => setNewCategory({ ...newcategory, name: e.target.value })}
                        placeholder="Add new category"/>
                    <button className='button-add' onClick={handleAddNewCategory}>Add</button>
                </div>
            </div>
        </div>
    )
}
    
export default Categories