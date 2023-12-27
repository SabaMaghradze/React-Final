import React from 'react'
import { LoadingWrapper } from '../../atoms'
import { useProduct } from '../../../hooks'
import { ProductCard, GridContainer } from '../shared';

export const HomePageProducts = () => {

    const { loading, homeProducts } = useProduct();

    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '90%' }}>
            <LoadingWrapper isLoading={loading} >
                <GridContainer>
                    {homeProducts.map((product) => (
                        <ProductCard key={product._id} product={product}></ProductCard>
                    ))}
                </GridContainer>
            </LoadingWrapper>
        </div>
    );
};
