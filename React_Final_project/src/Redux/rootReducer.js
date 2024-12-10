
const usersList = localStorage.getItem("users") != null ? JSON.parse(localStorage.getItem("users")) : [];
const idCounter = localStorage.getItem("idCounter") != null ? JSON.parse(localStorage.getItem("idCounter")) : 0;


const updateLocalStorage = (itemName, data) => {
    localStorage.setItem(itemName, JSON.stringify(data));
}


const initialState = {
    users: usersList,
    currentId: idCounter,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_USER':
            const newUser = { ...action.payload, id: state.currentId + 1 };
            const updatedUsers = [...state.users, newUser];
            updateLocalStorage("users", updatedUsers)
            updateLocalStorage("idCounter", state.currentId + 1)
            return { ...state, users: updatedUsers, currentId: state.currentId + 1 , errorMessage: ""};

        case 'DELETE_USER':
            const updatedDeleteUsers = state.users.filter((user)=> user.id != action.payload)
            updateLocalStorage("users", updatedDeleteUsers)
            return { ...state, users: updatedUsers };

        default:
            return state;
    }
};

export default usersReducer;