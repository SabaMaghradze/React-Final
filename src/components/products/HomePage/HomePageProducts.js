import React from 'react'
import { LoadingWrapper } from '../../atoms'
import { useProduct } from '../../../hooks'
import { ProductCard, GridContainer } from '../shared';

export const HomePageProducts = () => {

    const { loading, homeProducts } = useProduct();

    return (
        <LoadingWrapper isLoading={loading} >
            <GridContainer>
                {homeProducts.map((product) => (
                    <ProductCard key={product._id} product={product}></ProductCard>
                ))}
            </GridContainer>
        </LoadingWrapper>
    );
};
