import React from 'react';
import { FormControl, styled } from '@mui/material';

const StyledFormContainer = styled(FormControl)(() => ({
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}));

export const FormContainer = ({ children }) => {
    return (
        <StyledFormContainer>
            {children}
        </StyledFormContainer>
    );
};
