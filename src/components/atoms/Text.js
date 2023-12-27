import React from 'react'
import { Typography } from "@mui/material";

export const Text = ({ children, variant = 'body1', styles = {}, ...rest }) => {
    return (
        <Typography sx={styles} variant={variant} {...rest} >
            {children}
        </Typography>
    );
};