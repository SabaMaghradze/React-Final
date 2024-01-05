import { styled, Drawer, Box } from "@mui/material";
import { useCart, useUser } from "../../hooks";
import { LoadingWrapper } from "../atoms";
import { useDispatch } from "react-redux";
import { clearCart, saveCart } from "../../redux/slices/cartSlice";
import { Button } from "../atoms";
import { useTranslation } from "react-i18next";

const StyledCartItem = styled(Box)(() => ({
    width: 400,
    display: 'flex',
    alignItems: 'center',
    padding: '5px 10px',
    marginBottom: 20
}));

const StyledImage = styled('img')(() => ({
    width: 70,
    height: 70,
    objectFit: 'cover',
    borderRadius: 5
}));

const StyledButtonCointainer = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
}));

export const CartDrawer = ({ isCartOpen, setIsCartOpen, cartItems }) => {

    const { userData } = useUser();
    const dispatch = useDispatch();

    const { t } = useTranslation();

    const { loading } = useCart();

    return (
        <Drawer open={isCartOpen} onClose={() => setIsCartOpen(false)} anchor="right" >
            <LoadingWrapper isLoading={loading}>
                {cartItems && Array.isArray(cartItems) && cartItems.length > 0 ? (
                    <>
                        {cartItems.map((item) => {
                            const { product, quantity } = item;
                            const { name, _id, price, image } = product;
                            return (
                                <StyledCartItem key={_id}>
                                    <StyledImage src={image} alt='no image' />
                                    <Box sx={{ paddingLeft: 5 }}>
                                        <h3>{t('product')}: {name}</h3>
                                        <h3>{t('quantity')}: {quantity}</h3>
                                        <h3>{t('total')}: {quantity * price}$</h3>
                                    </Box>
                                </StyledCartItem>
                            );
                        })}
                        <StyledButtonCointainer>
                            <Button onClick={() => {
                                dispatch(clearCart());
                                setIsCartOpen(false);
                            }}>{t('clear_cart')}</Button>
                            {userData && <Button onClick={() => {
                                dispatch(saveCart({ userId: userData?.user._id, cartItems }))
                            }}>Save</Button>}
                        </StyledButtonCointainer>
                    </>
                ) : (
                    <p>No items in the cart.</p>
                )}
            </LoadingWrapper>

        </Drawer>
    );
};
