import React from 'react';
import { useProduct } from '../../hooks';
import { Box, List, ListItem, styled } from '@mui/material';
import { Link } from '../atoms';
import { Text } from '../atoms';
import { useTranslation } from 'react-i18next';

const StyledListItem = styled(ListItem)(() => ({
    padding: '5px 0px 3px 15px',
    margin: '0px'
}));

const StyledDiv = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
}))

export const ProductCategories = () => {

    const { productCategories } = useProduct();

    const { t } = useTranslation();

    return (
        <StyledDiv>
            <Text color='#FF9900' >{t('Categories')}:</Text>
            <List sx={{ display: 'flex' }}>
                {productCategories.map((category) => {
                    const { _id, name } = category;
                    return (
                        <>
                            <Link key={_id} to={`/products/categories/${name}?size=1&sort=price,desc&page=1`}>
                                <StyledListItem>
                                    <Text color='#FF9900'>{t(`categories.${name}`)}</Text>
                                </StyledListItem>
                            </Link>
                        </>
                    )
                })}
            </List>
        </StyledDiv>
    );
};
