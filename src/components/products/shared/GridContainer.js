import React from 'react';
import { Grid } from '@mui/material';

export const GridContainer = ({ children }) => {
    return (
        <Grid container sx={{
            width: '100%',
            justifyContent: 'space-between',
            gap: '10px',
            "& > .MuiGrid-item": {
                paddingRight: 0
            },
        }} >
            {children}
        </Grid>
    );
};

export const GridContainerTwo = ({ children }) => {
    return (
        <Grid container sx={{
            width: '100%',
            justifyContent: 'center',
            gap: '10px',
            "& > .MuiGrid-item": {
                paddingRight: 0
            },
        }} >
            {children}
        </Grid>
    );
}
