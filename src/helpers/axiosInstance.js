import axios from "axios";
import { checkTokenValidity } from "./utils";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001'
});

axiosInstance.interceptors.request.use(async (req) => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    // first we get the token and refresh token from local storage, then, if they are non-existent, that means the user is not logged in.
    if (!token || !refreshToken) return req;
    const isExpired = checkTokenValidity(token);

    if (!isExpired) {
        req.headers.Authorization = `Bearer ${token}`;
        return req;
    };

    try {
        const { data } = await axios.post('http://localhost:3001/users/refresh', {
            refresh_token: refreshToken, // the name "refresh_Token" is coming from the server
        });

        const { token: newAccessToken } = data;
        localStorage.setItem('token', newAccessToken);
        req.headers.Authorization = `Bearer ${newAccessToken}`;
        return req;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
});
