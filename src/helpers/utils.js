import { jwtDecode } from 'jwt-decode';

export const checkTokenValidity = (token) => {
    const expirationDate = jwtDecode(token).exp;
    const isExpired = expirationDate * 1000 < new Date().getTime();
    return isExpired;
};

export const isAdmin = (user) => {
    if (!user) return false;
    if (user.user.role.includes('admin')) {
        return true;
    };
};