import React from 'react';
import { useProduct } from '../hooks';
import { LoadingWrapper } from '../components/atoms';
import { useDispatch } from 'react-redux';
import { deleteProduct, setSelectedProduct } from '../redux';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { useUser } from '../hooks';
import { isAdmin } from '../helpers';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';

export const Homepage = () => {
    const { homeProducts, loading } = useProduct();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userData } = useUser();

    return (
        <LoadingWrapper isLoading={loading}>
            {homeProducts.map((product) => {
                return (
                    <div key={product._id}>
                        <h2>Name: {product.name}</h2>
                        {isAdmin(userData) && <>
                            <button onClick={() => {
                                dispatch(setSelectedProduct(product));
                                navigate(`/products/${product._id}/edit`);
                            }}>
                                {t('edit')}
                            </button>
                            <button onClick={() => dispatch(deleteProduct(product._id))}>{t('delete')}</button>
                            <button onClick={() => dispatch(addToCart(product))}>Add To Cart</button>
                            <button onClick={() => dispatch(removeFromCart(product._id))}>Remove From Cart</button>
                        </>}
                    </div>
                )
            })}
        </LoadingWrapper>
    )
};
