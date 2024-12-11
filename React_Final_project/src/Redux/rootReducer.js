
import { combineReducers } from "redux";


/**
 * Function to get data from local store
 * @param {*} itemName item to get
 * @param {*} defaultValue to set if not exists in local store
 * @returns the data from local store
 */
const getFromLocalStorage = (itemName, defaultValue) => {
    const data = localStorage.getItem(itemName);
    return data ? JSON.parse(data) : defaultValue;
};


/**
 * store data in local store
 * @param {*} itemName which item to sotre
 * @param {*} data data to store
 */
const updateLocalStorage = (itemName, data) => {
    localStorage.setItem(itemName, JSON.stringify(data));
}


// Initial Users States
const usersInitialState = {
    loginUser: getFromLocalStorage("loginUser", {}),
    users: getFromLocalStorage("users", []),
    currentId: getFromLocalStorage("idUser", 0),
};

// Initial Categories States
const categoriesInitialState = {
    categories: getFromLocalStorage("categories", []),
    currentId: getFromLocalStorage("idCategories", 0),
};

// Initial products States
const productsInitialState = {
    products: getFromLocalStorage("products", []),
    currentId: getFromLocalStorage("idProducts", 0),
};

//user reducer
const usersReducer = (state = usersInitialState, action) => {
    switch (action.type) {
        case 'ADD_USER':

            // build the new user object
            const newUser = { ...action.payload, id: state.currentId + 1 , joinedAt: new Date().toLocaleDateString() };
            const updatedUsers = [...state.users, newUser];
            updateLocalStorage("users", updatedUsers)
            updateLocalStorage("idUser", state.currentId + 1)
            return { ...state, users: updatedUsers, currentId: state.currentId + 1 };

        case 'DELETE_USER':
            //find the specific user
            const updatedDeleteUsers = state.users.filter((user) => user.id != action.payload)
            updateLocalStorage("users", updatedDeleteUsers)
            return { ...state, users: updatedUsers };

        case 'LOGIN_USER':
            updateLocalStorage("loginUser", action.payload)
            return { ...state, loginUser: action.payload };


        default:
            return state;
    }
};


// categories reducer 
const categoriesReducer = (state = categoriesInitialState, action) => {
    switch (action.type) {
        case 'ADD_CATEGORY':

            // build the new category object
            const newCategory = { ...action.payload, id: state.currentId + 1 };
            const updatedNewCategories = [...state.categories, newCategory];
            updateLocalStorage("categories", updatedNewCategories);
            updateLocalStorage("idCategories", state.currentId + 1);
            return { ...state, categories: updatedNewCategories, currentId: state.currentId + 1 };

        case 'DELETE_CATEGORY':

            //find the specific category
            const updatedDeleteCategories = state.categories.filter((category) => category.id != action.payload)
            updateLocalStorage("categories", updatedDeleteCategories)
            return { ...state, categories: updatedDeleteCategories };

        case 'UPDATE_CATEGORY':

            //find the specific category and update his data
            const modifiedCategories = state.categories.map((category) =>
                category.id == action.payload.id ? { ...category, ...action.payload } : category
            );
            updateLocalStorage("categories", modifiedCategories);
            return { ...state, categories: modifiedCategories };

        default:
            return state;
    }
};


// products reducer 
const productsReducer = (state = productsInitialState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCTS':

            // build the new product object
            const newProduct = { ...action.payload, id: state.currentId + 1 };
            const updatedNewProducts = [...state.products, newProduct];
            updateLocalStorage("products", updatedNewProducts);
            updateLocalStorage("idProducts", state.currentId + 1);
            return { ...state, products: updatedNewProducts, currentId: state.currentId + 1 };

        case 'DELETE_PRODUCTS':

            //find the specific product
            const updatedDeleteProducts = state.products.filter((product) => products.id != action.payload)
            updateLocalStorage("products", updatedDeleteProducts)
            return { ...state, products: updatedDeleteProducts };

        case 'UPDATE_PRODUCTS':

            //find the specific product and update his data
            const modifiedProducts = state.products.map((product) =>
                product.id == action.payload.id ? { ...product, ...action.payload } : product
            );
            updateLocalStorage("products", modifiedProducts);
            return { ...state, products: modifiedProducts };

        default:
            return state;
    }
};

// Combine the  Reducers
const rootReducer = combineReducers({
    users: usersReducer,
    categories: categoriesReducer,
    products: productsReducer
    
});

export default rootReducer;