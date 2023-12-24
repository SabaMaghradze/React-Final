import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';
import { LoadingWrapper, Text } from '../../atoms';
import { styled, Box } from '@mui/material';
import { ProductCardActions } from '../shared';

const Container = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-around'
}));

const StyledImage = styled('img')(() => ({
  width: '350px',
  height: '350px',
  objectFit: 'cover'
}));

const Description = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '15px'
}));

export const SingleProduct = () => {

  const { categoryName, id } = useParams();
  const { getData, data, loading } = useFetch();

  useEffect(() => {
    getData(`/products/category/${categoryName}/${id}`);
  }, [id, categoryName, getData]);

  const { image, name, description, brand } = data?.product || {};
  console.log(name);

  return (
    <LoadingWrapper isLoading={loading}>
      <Container>
        <StyledImage src={image} />
        <Box>
          <Description>
            <Text>Product Name</Text>
            <Text>{name}</Text>
          </Description>
          <Description>
            <Text>Brand</Text>
            <Text>{brand}</Text>
          </Description>
          <Description>
            <Text>Description</Text>
            <Text>{description}</Text>
          </Description>
          <ProductCardActions product={data?.product} />
        </Box>
      </Container>
    </LoadingWrapper>
  );
};
