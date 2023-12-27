import React from 'react'
import { Button as MUIButton } from "@mui/material";

export const Button = ({ onClick, children, styles = {}, variant }) => {
    return (
        <MUIButton onClick={onClick} sx={styles} variant={variant} >
            {children}
        </MUIButton>
    )
};
