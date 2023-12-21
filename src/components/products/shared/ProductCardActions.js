import React from 'react';
import { useUser } from '../../../hooks';
import { isAdmin } from '../../../helpers';
import { useDispatch } from 'react-redux';
import { Button } from '../../atoms';
import { Box } from '@mui/material';
import { useCart } from '../../../hooks';
import { removeFromCart, addToCart } from '../../../redux/slices/cartSlice';
import { Text } from '../../atoms';

export const ProductCardActions = ({ product }) => {

    const { userData } = useUser();
    const { cartItems } = useCart();

    const productInCart = cartItems.find((item) => item.product._id === product._id);

    const dispatch = useDispatch();

    if (isAdmin(userData)) {
        return <h2>test</h2>
    };

    return <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {!productInCart ? <Button onClick={() => dispatch(addToCart(product))}>Add to Cart</Button>
            :
            <>
                <Button onClick={() => dispatch(removeFromCart(product._id))}>
                    -
                </Button>
                <Text>{productInCart.quantity}</Text>
                <Button onClick={() => {
                    dispatch(addToCart(product))
                    console.log(product);
                }}>
                    +
                </Button>
            </>
        }
    </Box>
};
