import React from 'react';
import { Card, Grid, styled, Box, CardActions } from '@mui/material';
import { Link } from '../../atoms';
import { Text } from '../../atoms';
import { ProductCardActions } from './ProductCardActions';
import { useTranslation } from 'react-i18next';

const StyledImage = styled('img')(() => ({
    objectFit: 'cover',
    width: '100%',
    height: '270px'
}));

const StyledInfoContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px 20px',
    height: '100px', // Set a fixed height for the product name container
    overflow: 'hidden',
}));

const StyledProductName = styled(Text)(({ theme }) => ({
    fontSize: '20px',
    color: 'black',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2, // Set the maximum number of lines before ellipsis
    overflow: 'hidden'
}));


export const ProductCard = ({ product }) => {
    
    const { name, _id, price, image, category } = product;

    const { t } = useTranslation();

    return (
        <Grid item xs={12} sm={12} md={4} lg={3} >
            <Card sx={{ borderRadius: '15px' }}>
                <Link to={`/products/categories/${category}/${_id}`}>
                    <StyledImage src={image} />
                    <StyledInfoContainer>
                        <StyledProductName>{name}</StyledProductName>
                        <Text fontSize='20px' color='black'>{t('price')}: {price}$</Text>
                    </StyledInfoContainer>
                </Link>
                <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                    <ProductCardActions product={product} />
                </CardActions>
            </Card>
        </Grid>
    );
};
