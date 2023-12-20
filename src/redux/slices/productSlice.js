import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../helpers";

export const addProduct = createAsyncThunk('product/addProduct', async ({ product, productId }) => {
    try {
        const method = productId ? 'put' : 'post';
        const endpoint = productId ? `/products/${productId}` : '/products';
        const { data } = await axiosInstance[method](endpoint, { product });
        return data;
    } catch (error) {
        console.error('An error occurred sending post request to \'/products\':', error);
        throw error;
    }
});

export const fetchHomeProducts = createAsyncThunk('products/fetchHomeProducts', async () => {
    try {
        const { data } = await axiosInstance.get('/products');
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id, { dispatch }) => {
    try {
        await axiosInstance.delete(`/products/${id}`);
        dispatch(fetchHomeProducts());
    } catch (error) {
        console.log(error);
    }
});

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        error: false,
        loading: false,
        homeProducts: [],
        selectedProduct: null
    },
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        }
    },
    extraReducers: (builder) => {
        // add product
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
        // fetch home products
        builder.addCase(fetchHomeProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchHomeProducts.fulfilled, (state, action) => {
            state.error = false;
            state.loading = false;
            state.homeProducts = action.payload.products;
        });
        builder.addCase(fetchHomeProducts.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
        // delete product
        builder.addCase(deleteProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteProduct.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(deleteProduct.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
    }
});

export const { setSelectedProduct } = productSlice.actions;

export const productReducer = productSlice.reducer;