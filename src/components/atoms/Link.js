import React from 'react';
import { Link as RouterLink } from "react-router-dom";

export const Link = ({ to, children, style = {} }) => {
    return (
        <RouterLink to={to} style={{ ...style, textDecoration: 'none' }} >
            {children}
        </RouterLink>
    )
};