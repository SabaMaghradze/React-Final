import { React, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { FormContainer, Input, Button } from '../atoms';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { productFormValidationSchema } from './productFormValidationSchema';
import FileBase64 from 'react-file-base64';
import { addProduct } from '../../redux/slices';


export const ProductForm = () => {

  const [image, setImage] = useState('');

  const { handleSubmit, control, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(productFormValidationSchema),
    mode: 'onChange'
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await dispatch(addProduct({ product: { ...data, image } }))
        .unwrap()
        .then(() => {
          navigate('/');
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
      <Controller name='name' defaultValue='' control={control} render={({ field }) => {
        const { name, onChange } = field;
        return <Input name={name} onChange={onChange} label='Name' helperText={errors.name?.message} error={Boolean(errors.name)} />
      }} />

      <Controller name='description' defaultValue='' control={control} render={({ field }) => {
        const { name, onChange } = field;
        return <Input name={name} onChange={onChange} label='Description' helperText={errors.description?.message} error={Boolean(errors.description)} />
      }} />

      <Controller name='brand' defaultValue='' control={control} render={({ field }) => {
        const { name, onChange } = field;
        return <Input name={name} onChange={onChange} label='Brand' helperText={errors.brand?.message} error={Boolean(errors.brand)} />
      }} />

      <Controller name='category' defaultValue='' control={control} render={({ field }) => {
        const { name, onChange } = field;
        return <Input name={name} onChange={onChange} label='Category' helperText={errors.category?.message} error={Boolean(errors.category)} />
      }} />

      <Controller name='price' defaultValue='' control={control} render={({ field }) => {
        const { name, onChange } = field;
        return <Input name={name} onChange={onChange} label='Price' helperText={errors.price?.message} error={Boolean(errors.price)} />
      }} />

      <FileBase64 type='file' multiple={false} onDone={({ base64 }) => {
        setImage(base64);
      }} />

      <Button onClick={handleSubmit(onSubmit)} disabled={!isValid}>Add Product</Button>

    </FormContainer>
  )
};


