import React from 'react'
import { Grid } from '@mui/material'
import { Link } from '../atoms'

const StyledLink = ({ children }) => {
    return <Link style={{ color: '#FF9900' }}>{children}</Link>
}

export const Footer = () => {
    return (
        <Grid container sx={{ justifyContent: 'space-between', padding: '20px 70px 70px 70px', backgroundColor: '#131921', }}>
            <Grid item sx={{ gap: '10px' }}>
                <Grid container sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <Grid item><StyledLink >Terms and conditions of Use of the site</StyledLink></Grid>
                    <Grid item><StyledLink >Privacy Policy</StyledLink></Grid>
                    <Grid item><StyledLink >Online Purchase Return Policy</StyledLink></Grid>
                    <Grid item><StyledLink >Cookie Policy</StyledLink></Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <Grid item><StyledLink>Warranty for individuals</StyledLink></Grid>
                    <Grid item><StyledLink >Warranty for organizations</StyledLink></Grid>
                    <Grid item><StyledLink >Statutory Warranty</StyledLink></Grid>
                    <Grid item><StyledLink >Service center addresses</StyledLink></Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <Grid item><StyledLink>Hotline *xxxx</StyledLink></Grid>
                    <Grid item><StyledLink>(032) XXX XX XX</StyledLink></Grid>
                    <Grid item><StyledLink>retail@ecommerce.com</StyledLink></Grid>
                    <Grid item><StyledLink>Our stores</StyledLink></Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
