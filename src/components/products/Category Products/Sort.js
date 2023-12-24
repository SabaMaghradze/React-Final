import { MenuItem, Select } from '@mui/material';
import React from 'react';

export const Sort = ({ value, changeSort }) => {
    return (
        <Select defaultValue='' value={value ?? 'price,desc'} onChange={(e) => { changeSort("sort", e.target.value) }}>
            <MenuItem value='price,desc'>Price Descending</MenuItem>
            <MenuItem value='price,asc'>Price Ascending</MenuItem>
            <MenuItem value='name,desc'>Name Descending</MenuItem>
            <MenuItem value='name,asc'>Name Ascending</MenuItem>
        </Select>
    )
};
