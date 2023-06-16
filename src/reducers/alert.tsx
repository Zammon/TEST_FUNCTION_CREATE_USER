import { createSlice } from '@reduxjs/toolkit';

export const ALERTTITLE = Object.freeze({
    CHECKFORM: 'Incomplete information',
    CREATE_COMPLETE: 'Successfully!',
    PROMPT_SAVE: 'Do you want to save data?'
})

export const ALERTDESCRIPTION = Object.freeze({
    CHECKFORM: 'Please check that all information is filled in. and press send again',
    CREATE_COMPLETE: 'You have successfully created a new user. The system will lead to the main page.'
})

interface AlertReducerInterface {
   open: boolean;
   type: "alert"|"prompt"
   title: string;
   description: string;
}

const initialState:AlertReducerInterface = {
    open: false,
    type: "alert",
    title: ALERTTITLE.CHECKFORM,
    description: ALERTDESCRIPTION.CHECKFORM,
}

const alertReducer = createSlice({
    name: 'alert',
    initialState: initialState,
    reducers: {
        changeStatus: (state, action)=> {
            state.open = action.payload;
        },
        setTitle: (state,action)=> {
            state.title = action.payload;
        },
        setDescription: (state,action)=> {
            state.description = action.payload;
        },
        setDetail: (state,action)=> {
            state.title =  action.payload.title;
            state.open = action.payload.status;
            state.type = action.payload.type;
        },
    }
});

export const { changeStatus, setTitle, setDescription, setDetail} = alertReducer.actions;
export default alertReducer.reducer;