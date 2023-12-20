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

export const getUserInitials = (user) => {
    if (!user) return '';
    let initials = `${user.user.firstName[0]}.${user.user.lastName[0]}`;
    return initials;
};



