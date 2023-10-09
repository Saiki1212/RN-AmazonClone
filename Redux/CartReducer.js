import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart:[]
    },
    reducers: {
        addToCart: (state, action) => {
            const itemPresent = state.cart.find(
                (item) => item.id === action.payload.id
              );
            itemPresent ? itemPresent.quantity++ : state.cart.push({...action.payload , quantity : 1})
        },

        removeFromCart: (state,action) => {
            const removeTheItem = state.cart.filter((item) => item.id !== action.payload.id)
            state.cart = removeTheItem
        },
        incrementQuantity: (state,action) => {
            const itemPresent = state.cart.find((item) => item.id === action.payload.id)
            itemPresent.quantity++
        },
        decrementQuantity: (state,action) => {
            const itemPresent = state.cart.find((item) => item.id === action.payload.id)
            if(itemPresent.quantity === 1) {
                itemPresent.quantity = 0
                const removeTheItem = state.cart.filter((item) => item.id !== action.payload.id)
                state.cart = removeTheItem
            }
            else{
                itemPresent.quantity--;
            }
        },
        cleanCart: (state,action) => {
            state.cart = []
        },
        
    },
})

export const {addToCart, removeFromCart, cleanCart, incrementQuantity, decrementQuantity} = cartSlice.actions

export default cartSlice.reducer