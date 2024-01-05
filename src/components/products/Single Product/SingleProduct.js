import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';
import { LoadingWrapper, Text } from '../../atoms';
import { styled, Box } from '@mui/material';
import { ProductCardActions } from '../shared';
import { useTranslation } from 'react-i18next';

const Container = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  gap: '25px',
}));

const StyledImage = styled('img')(() => ({
  width: '350px',
  height: '350px',
  objectFit: 'cover'
}));

const Description = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '15px',
}));

export const SingleProduct = () => {

  const { categoryName, id } = useParams();
  const { getData, data, loading } = useFetch();

  const { t } = useTranslation();

  useEffect(() => {
    getData(`/products/category/${categoryName}/${id}`);
  }, [id, categoryName, getData]);

  const { image, name, description, brand } = data?.product || {};

  return (
    <LoadingWrapper isLoading={loading}>
      <Container>
        <StyledImage src={image} />
        <Box>
          <Description>
            <Text styles={{ fontSize: '20px' }}>{t("product")}: {name}</Text>
          </Description>
          <Description>
            <Text styles={{ fontSize: '20px' }}>{t('brand')}: {brand}</Text>
          </Description>
          <Description>
            <Text styles={{ fontSize: '20px' }}>{t("description")}: {description}</Text>
          </Description>
          <ProductCardActions product={data?.product} />
        </Box>
      </Container>
    </LoadingWrapper>
  );
};
