import { configureStore } from "@reduxjs/toolkit";
import CartSliceReducer from "./CartSlice";

export const store = configureStore({
    reducer : {
        name: CartSliceReducer,
    }
});

export default store