import { createSlice } from '@reduxjs/toolkit';
import { UsersInterface } from '../mocup';

interface ReducerInterface {
    users: UsersInterface[];
    datailEditUser: UsersInterface;
}

export const headers = [
    {
        title: "Profile picture",
        size: "200px",
        position: "center"
    },
    {
        title: "First name",
        size: "200px",
        position: "center"
    },
    {
        title: "Last name",
        size: "200px",
        position: "center"
    },
    {
        title: "Gender",
        size: "200px",
        position: "center"
    },
    {
        title: "Birthday",
        size: "200px",
        position: "center"
    },
    {
        title: "Action",
        size: "200px",
        position: "center"
    },
]

const initialState:ReducerInterface = {
    users:[
        {
            _id: 0,
            profile:"/Profile_.png",
            firstName: "Zam",
            lastName:"Mon",
            gender:"male",
            birthDate: "2023-06-03"
        },
    ],
    datailEditUser: {}
}

const userReducer = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        addUser: (state,action)=> {
            state.users.push( action.payload);
        },
        editUser: (state,action)=> {
            const edit = state.users.map(user=>user._id).indexOf(action.payload._id);
            state.users[edit] = action.payload;
        },
        deleteUser: (state,action)=> {
            const filter = state.users.filter((user)=>{
                return user._id !== action.payload
            })
            state.users = filter;
        },
        setDetailEdit: (state,action)=> {
            state.datailEditUser =  action.payload;
        },
    } 
});

export const { addUser, editUser, deleteUser, setDetailEdit } = userReducer.actions;
export default userReducer.reducer;