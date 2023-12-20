import React from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children, hasAccess }) => {
    if (hasAccess) {
        return children;
    };
    return (
        <Navigate to='/login' />
    )
};
