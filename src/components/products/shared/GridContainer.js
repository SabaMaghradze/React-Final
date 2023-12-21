import React from 'react'
import { Grid } from '@mui/material'

export const GridContainer = ({ children }) => {
    return (
        <Grid container sx={{
            width: '90%',
            justifyContent: 'center',
            gap: '10px',
            "& > .MuiGrid-item": {
                paddingRight: 0
            },
        }} >
            {children}
        </Grid>
    );
};
