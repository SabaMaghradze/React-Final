import { MenuItem, Select } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const Sort = ({ value, changeSort }) => {

    const { t } = useTranslation();

    return (
        <Select defaultValue='' value={value ?? 'price,desc'} onChange={(e) => { changeSort("sort", e.target.value) }} sx={{ marginLeft: '10px' }}>
            <MenuItem value='price,desc'>{t('price_descending')}</MenuItem>
            <MenuItem value='price,asc'>{t('price_ascending')}</MenuItem>
            <MenuItem value='name,desc'>{t('sort_by_reverse_alphabet')}</MenuItem>
            <MenuItem value='name,asc'>{t('sort_by_alphabet')}</MenuItem>
        </Select>
    )
};
