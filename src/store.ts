import { configureStore } from "@reduxjs/toolkit";
import alert from "./reducers/alert";
import users from "./reducers/users";
import pagination from "./reducers/pagination";


export const store = configureStore({
    reducer: {
        alert: alert,
        user: users,
        pagination: pagination
    }
});