import React from 'react';
import { TextField } from '@mui/material';

export const Input = ({ type = 'text', label, error, helperText, name, onChange, value, styles = {} }) => {
  return (
    <TextField type={type} label={label} error={error} helperText={helperText} name={name} onChange={onChange} value={value} sx={{ width: 500, marginTop: 5, ...styles}} />
  );
};
