import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import { productReducer } from "./slices";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
};

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer
});

export const persistedStore = persistStore(store);