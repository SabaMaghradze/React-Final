import React from 'react';
import { useProduct } from '../../hooks';
import { List, ListItem, styled } from '@mui/material';
import { Link } from '../atoms';
import { Text } from '../atoms';

const StyledListItem = styled(ListItem)(() => ({
    padding: '5px 0px 3px 15px',
    margin: '0px'
}));

export const ProductCategories = () => {

    const { productCategories } = useProduct();

    return (
        <List sx={{ display: 'flex' }}>
            {productCategories.map((category) => {
                const { _id, name } = category;
                return (
                    <Link key={_id} to={`/products/categories/${name}?size=1&sort=price,desc&page=1`}>
                        <StyledListItem>
                            <Text color='#FF9900'>{name}</Text>
                        </StyledListItem>
                    </Link>
                )
            })}
        </List>
    );
};
