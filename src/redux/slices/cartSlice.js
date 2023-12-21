import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getTotalQuantity = (arr) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i].quantity;
    };
    return sum;
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        loading: false,
        cartItems: [],
        cartLength: null,
        error: null
    },

    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
            state.cartLength = 0;
        },
        addToCart: (state, action) => {
            const productId = action.payload._id;

            const productInCart = state.cartItems.find((item) => item.product._id === productId);

            if (productInCart) {
                const updatedCart = state.cartItems.map((cartElement) => {
                    return cartElement.product._id === productId ? { ...cartElement, quantity: cartElement.quantity + 1 } : { ...cartElement }
                });
                state.cartItems = updatedCart;
            } else {
                state.cartItems.push({ product: action.payload, quantity: 1 });
            };

            state.cartLength = getTotalQuantity(state.cartItems);

        },
        removeFromCart: (state, action) => {
            const productId = action.payload;

            const productInCart = state.cartItems.find((item) => item.product._id === productId);

            if (productInCart.quantity > 1) {

                const updatedCart = state.cartItems.map((cartElement) => {
                    return cartElement.product._id === productId
                        ? { ...cartElement, quantity: cartElement.quantity - 1 }
                        : { ...cartElement };
                });
                state.cartItems = updatedCart;
            } else {
                state.cartItems = state.cartItems.filter((item) => item.product._id !== productId);
            };

            state.cartLength = getTotalQuantity(state.cartItems);

        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;