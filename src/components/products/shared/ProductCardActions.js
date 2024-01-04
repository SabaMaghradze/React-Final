import React from 'react';
import { useUser } from '../../../hooks';
import { isAdmin } from '../../../helpers';
import { useDispatch } from 'react-redux';
import { Button } from '../../atoms';
import { Box } from '@mui/material';
import { useCart } from '../../../hooks';
import { removeFromCart, addToCart } from '../../../redux/slices/cartSlice';
import { Text } from '../../atoms';
import { useNavigate } from 'react-router-dom';
import { deleteProduct, setSelectedProduct } from '../../../redux/slices/productSlice';
import { useTranslation } from 'react-i18next';

export const ProductCardActions = ({ product }) => {

    const { userData } = useUser();
    const { cartItems } = useCart();

    const { t } = useTranslation();

    const productInCart = cartItems && product
        ? cartItems.find((item) => item.product && item.product._id === product._id)
        : null;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (isAdmin(userData)) {
        return (
            <Box>
                <Button onClick={() => {
                    navigate(`/products/${product._id}/edit`);
                    dispatch(setSelectedProduct(product));
                }}>{t('edit')}</Button>
                <Button onClick={() => {
                    dispatch(deleteProduct(product._id));
                }}>{t('delete')}</Button>
            </Box>
        )
    };

    return <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        {!productInCart ? <Button variant='contained' styles={{ fontSize: '15px', borderRadius: '10px' }} onClick={() => dispatch(addToCart(product))}>{t('add_to_cart')}</Button>
            :
            <>
                <Button styles={{ fontSize: '20px' }} onClick={() => dispatch(removeFromCart(product._id))}>
                    -
                </Button>
                <Text styles={{ fontSize: '20px' }}>{productInCart.quantity}</Text>
                <Button styles={{ fontSize: '20px' }} onClick={() => {
                    dispatch(addToCart(product))
                    console.log(product);
                }}>
                    +
                </Button>
            </>
        }
    </Box>
};
