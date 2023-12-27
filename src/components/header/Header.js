import { LanguageSelect, Link } from '../atoms';
import { SearchBar } from './SearchBar';
import { AppBar, Toolbar, styled, Box, Badge } from '@mui/material';
import { UserIcon } from './UserIcon';
import { FaShoppingCart } from "react-icons/fa";
import { Button } from '../atoms';
import { useCart } from '../../hooks';
import { CartDrawer } from './CartDrawer';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProductCategories } from './ProductCategories';

const StyledAppBar = styled(AppBar)(() => ({
    backgroundColor: '#131921',
    padding: '0 37px 0 30px'
}));

const StyledToolBar = styled(Toolbar)(() => ({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 8
}));

export const Header = () => {

    const { cartItems, cartLength } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);

    const { t } = useTranslation();
    
    return (
        <Box>
            <StyledAppBar>
                <StyledToolBar>
                    <Link to='/' style={{ color: 'white' }}>
                        {t('home')}
                    </Link>
                    <SearchBar />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button onClick={() => setIsCartOpen(true)}>
                            <Badge badgeContent={cartLength} color='primary'>
                                <FaShoppingCart size={30} color='white' />
                            </Badge>
                        </Button>
                        <UserIcon />
                        <LanguageSelect />
                    </Box>
                </StyledToolBar>
                <ProductCategories />
            </StyledAppBar>
            <CartDrawer isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} cartItems={cartItems} />
        </Box>
    );
};
