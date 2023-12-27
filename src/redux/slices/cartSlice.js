import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from '../../helpers';

const getTotalQuantity = (arr) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i].quantity;
    };
    return sum;
};

export const saveCart = createAsyncThunk('cart/saveCart', async ({ userId, cartItems }, { rejectWithValue, dispatch }) => {
    try {
        await axiosInstance.put(`/users/${userId}/cart`, { products: cartItems });
        dispatch(fetchCart((userId)));
    } catch (error) {
        rejectWithValue('could not save cart');
    };
});

export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`/users/${userId}/cart`);
        return data;
    } catch (error) {
        rejectWithValue('Error fetching cart items');
    }
})

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
    extraReducers: (builder) => {
        builder.addCase(saveCart.pending, (state) => {
            state.loading = true
        });
        builder.addCase(saveCart.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(saveCart.rejected, (state) => {
            state.error = true;
        });

        builder.addCase(fetchCart.pending, (state) => {
            state.loading = true
        });
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cartItems = action.payload.cart;
        });
        builder.addCase(fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;