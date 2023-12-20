import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from '../../helpers';

export const authenticateUser = createAsyncThunk('user/authenticateUser', async ({ isLogin, formValues }) => {
    const endpoint = `/users/${isLogin ? 'login' : 'register'}`;
    try {
        const { data } = await axiosInstance.post(endpoint, formValues);
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        return data;
    } catch (error) {
        console.log(`An error occurred sending fetch request to following endpoint: ${endpoint}, error: ${error}`)
    };
});


const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        error: false,
        userData: null
    },
    reducers: {
        logout: (state) => {
            state.userData = null;
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(authenticateUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(authenticateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.userData = action.payload;
        })
        builder.addCase(authenticateUser.rejected, (state) => {
            state.loading = false;
            state.error = true;
        })
    }
});

export const { logout } = userSlice.actions;

export const userReducer = userSlice.reducer;
