import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignupValidationSchema } from './SignUpFormValidation';
import { FormContainer, Input, Button } from '../atoms';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../../redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const SignUpForm = () => {

    const { handleSubmit, control, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(SignupValidationSchema),
        mode: 'onChange'
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { t } = useTranslation();

    const onSubmit = (data) => {
        dispatch(authenticateUser({ formValues: data, isLogin: false }))
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
            <Controller control={control} name='firstName' defaultValue='' render={({ field }) => {
                const { name, onChange } = field;
                return <Input name={name} onChange={onChange} label={t("firstName")} error={Boolean(errors.firstName)} helperText={errors.firstName?.message} />
            }} />

            <Controller control={control} name='lastName' defaultValue='' render={({ field }) => {
                const { name, onChange } = field;
                return <Input name={name} onChange={onChange} label={t("lastName")} error={Boolean(errors.lastName)} helperText={errors.lastName?.message} />
            }} />

            <Controller control={control} name='email' defaultValue='' render={({ field }) => {
                const { name, onChange } = field;
                return <Input name={name} onChange={onChange} label={t("email")} error={Boolean(errors.email)} helperText={errors.email?.message} />
            }} />

            <Controller control={control} name='password' defaultValue='' render={({ field }) => {
                const { name, onChange } = field;
                return <Input name={name} onChange={onChange} type='password' label={t("password")} error={Boolean(errors.password)} helperText={errors.password?.message} />
            }} />

            <Button disabled={!isValid} onClick={handleSubmit(onSubmit)}>{t("sign_up")}</Button>
        </FormContainer>
    );
};
