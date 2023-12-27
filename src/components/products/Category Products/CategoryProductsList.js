import React, { useEffect } from 'react';
import { useProduct } from '../../../hooks';
import { Box, styled } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQueryParams } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { fetchCategoryProducts } from '../../../redux';
import { GridContainer, ProductCard, GridContainerTwo } from '../shared';
import { LoadingWrapper } from '../../atoms';
import { Sort } from './Sort';
import { Paginate } from './Paginate';

const Container = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap:  '20px',
    height: '100%',
    marginTop: '10px'
}));

export const CategoryProductsList = () => {

    const { loading, totalPages, categoryProducts } = useProduct();
    const { categoryName } = useParams();

    const { value: sort, changeQueryValue: changeSort } = useQueryParams('sort');

    const { value: page, changeQueryValue: changePage } = useQueryParams('page');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoryProducts({ categoryName, queryUrl: `?size=1&sort=${sort}&page=${page}` }));
    }, [categoryName, dispatch, sort, page]);

    useEffect(() => {
        changePage('page', 1);
    }, [sort]);

    return (
        <LoadingWrapper isLoading={loading} >
            <Sort value={sort} changeSort={changeSort} />
            <Container>
                <GridContainerTwo>
                    {categoryProducts.map((product) => {
                        return <ProductCard key={product._id} product={product} />
                    })}
                </GridContainerTwo>
                <Paginate totalPages={totalPages} currentPage={page} changePage={changePage} />
            </Container>
        </LoadingWrapper>
    );
};
