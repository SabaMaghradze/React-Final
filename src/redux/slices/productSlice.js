import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../helpers";

export const addProduct = createAsyncThunk('product/addProduct', async ({ product }) => {
    try {
        const method = 'post';
        const endpoint = '/products';
        const { data } = await axiosInstance[method](endpoint, { product });
        return data;
    } catch (error) {
        console.error('An error occurred sending post request to \'/products\':', error);
        throw error;
    }
});

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        error: false,
        loading: false,
    },
    extraReducers: (builder) => {
        builder.addCase(addProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addProduct.fulfilled, (state) => {
            state.error = false;
            state.loading = false;
        });
        builder.addCase(addProduct.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
    }
});

export const productReducer = productSlice.reducer;