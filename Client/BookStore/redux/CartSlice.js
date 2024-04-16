import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const CartSlice = createSlice({
    name: 'Siddhant',
    initialState,
    reducers: {
        addCartItem: (state, action) => {
            state.push(action.payload)
        },
        removeItemCart: (state, action) => {
           return state.filter((item,index) => index !== action.payload);
        }
    }
})

export const {addCartItem, removeItemCart} = CartSlice.actions
export default CartSlice.reducer;