import { React, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { FormContainer, Input, Button } from '../atoms';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { productFormValidationSchema } from './productFormValidationSchema';
import FileBase64 from 'react-file-base64';
import { addProduct, fetchHomeProducts, setSelectedProduct } from '../../redux/slices';
import { useProduct } from '../../hooks';


export const ProductForm = () => {

  const [image, setImage] = useState('');
  const { selectedProduct } = useProduct();

  const { handleSubmit, control, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(productFormValidationSchema),
    mode: 'onChange'
  });

  useEffect(() => {
    if (selectedProduct) {
      setImage(selectedProduct.image);
    }
  }, [selectedProduct]);

  useEffect(() => {
    return () => {
      dispatch(setSelectedProduct(null));
    }
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await dispatch(addProduct({ product: { ...data, image }, productId: selectedProduct?._id }))
        .unwrap()
        .then(() => {
          navigate('/')
          dispatch(fetchHomeProducts())
        })
        .catch((error) => {
          console.error('Error adding product:', error.message || error);
        });
    } catch (error) {
      console.error('Error adding product:', error.message || error);
    }
  };
  
  return (
    <FormContainer>
      <Controller name='name' defaultValue={selectedProduct?.name} control={control} render={({ field }) => {
        const { name, onChange, value } = field;
        return <Input name={name} value={value} onChange={onChange} label='Name' helperText={errors.name?.message} error={Boolean(errors.name)} />
      }} />

      <Controller name='description' defaultValue={selectedProduct?.description} control={control} render={({ field }) => {
        const { name, onChange, value } = field;
        return <Input name={name} value={value} onChange={onChange} label='Description' helperText={errors.description?.message} error={Boolean(errors.description)} />
      }} />

      <Controller name='brand' defaultValue={selectedProduct?.brand} control={control} render={({ field }) => {
        const { name, onChange, value } = field;
        return <Input name={name} value={value} onChange={onChange} label='Brand' helperText={errors.brand?.message} error={Boolean(errors.brand)} />
      }} />

      <Controller name='category' defaultValue={selectedProduct?.category} control={control} render={({ field }) => {
        const { name, onChange, value } = field;
        return <Input name={name} value={value} onChange={onChange} label='Category' helperText={errors.category?.message} error={Boolean(errors.category)} />
      }} />

      <Controller name='price' defaultValue={selectedProduct?.price} control={control} render={({ field }) => {
        const { name, onChange, value } = field;
        return <Input name={name} value={value} onChange={onChange} label='Price' helperText={errors.price?.message} error={Boolean(errors.price)} />
      }} />

      <FileBase64 type='file' multiple={false} onDone={({ base64 }) => {
        setImage(base64);
      }} />

      <Button onClick={handleSubmit(onSubmit)} disabled={!isValid}>{selectedProduct ? 'Update' : 'Add Product'}</Button>

    </FormContainer>
  )
};


