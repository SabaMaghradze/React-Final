import React from 'react'
import { Typography } from "@mui/material";

export const Text = ({ children, variant = 'body1', ...rest }) => {
    return (
        <Typography variant={variant} {...rest}>
            {children}
        </Typography>
    );
};