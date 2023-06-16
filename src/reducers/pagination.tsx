import { createSlice } from '@reduxjs/toolkit';

interface PaginationReducerInterface {
    targetPage: number;
}

const initialState:PaginationReducerInterface = {
    targetPage: 1
}

const pageinationReducer = createSlice({
    name: 'pagination',
    initialState: initialState,
    reducers: {
        next: (state, actions)=> {
            state.targetPage = actions.payload + 1;
        },
        prev: (state,actions)=> {
            state.targetPage = actions.payload - 1;
        },
        choosePage: (state,actions)=> {
            state.targetPage = actions.payload;
        } 
    } 
});

export const { next, prev, choosePage } = pageinationReducer.actions;
export default pageinationReducer.reducer;