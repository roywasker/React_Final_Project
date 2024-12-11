import React, { useState } from 'react'
import Menu from './Menu'
import { useSelector, useDispatch } from 'react-redux'


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
        <div style={{display: 'flex'}}>
            <div style={{position: 'absolute',top: 0,left: "40%",}}>
                <Menu />
            </div>

            {/* Categories content below Menu */}
            <div style={{marginTop: '100px', padding: '20px',backgroundColor: "LightGray",
            }}>
                <h1 style={{ textAlign: "left" }}>Categories</h1>
                <div style={{padding: "20px", width: "500px", backgroundColor: 'WhiteSmoke',borderRadius: "5px"}}>
                    {categories.map((category) => (
                        <div key={category.id} style={{textAlign: "left", backgroundColor: 'WhiteSmoke', border: "1px solid Gainsboro", borderRadius: "5px", padding: "20px", marginBottom: "10px"}}>
                            {updatecategory.name === category.name ? (
                                <input type="text" value={updatecategory.newName} style={{ height: "28px" }}
                                    onChange={e => setUpdateCategory({ ...updatecategory, newName: e.target.value })}/>
                            ) : (
                                <h2 style={{ display: 'inline' }}>{category.name}</h2>
                            )}
                            <button style={{ backgroundColor: "LightGray", marginLeft: "5%" }} onClick={() => handleUpdateCategory(category)}>Update</button>
                            <button style={{ backgroundColor: "LightGray", marginLeft: "5%" }} onClick={() => handleDeleteCategory(category)}>Remove</button>
                        </div>
                    ))}
                    <input type="text" name='new category'
                        style={{ marginRight: "4%", borderRadius: "5px", width: "80%", height: "28px" }}
                        value={newcategory.name}
                        onChange={e => setNewCategory({ ...newcategory, name: e.target.value })}
                        placeholder="Add new category"/>
                    <button style={{ backgroundColor: "LimeGreen" }} onClick={handleAddNewCategory}>Add</button>
                </div>
            </div>
        </div>
    )
}
    
export default Categories