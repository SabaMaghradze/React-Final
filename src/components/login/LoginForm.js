import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { loginFormValidation } from './loginFormValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, FormContainer, Button } from '../atoms';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../../redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const LoginForm = () => {

    const { handleSubmit, formState: { errors, isValid }, control } = useForm({
        mode: 'onChange',
        resolver: yupResolver(loginFormValidation)
    });

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        dispatch(authenticateUser({ formValues: data, isLogin: true }))
            .unwrap()
            .then(() => {
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
            })
    };

    return (

        <FormContainer>

            <Controller name='email' control={control} defaultValue='' render={({ field }) => {
                const { name, onChange } = field;
                return <Input name={name} onChange={onChange} label={t('email')} error={!!errors.email} helperText={errors.email?.message} />
            }} />

            <Controller name='password' control={control} defaultValue='' render={({ field }) => {
                const { name, onChange } = field;
                return <Input type='password' name={name} onChange={onChange} label={t("password")} error={!!errors.password} helperText={errors.password?.message} />
            }} />

            <Button onClick={handleSubmit(onSubmit)} disabled={!isValid} >{t("sign_in")}</Button>

        </FormContainer>
    );
};
