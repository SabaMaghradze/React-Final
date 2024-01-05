import { styled, Drawer, Box } from "@mui/material";
import { useCart, useUser } from "../../hooks";
import { LoadingWrapper, Text } from "../atoms";
import { useDispatch } from "react-redux";
import { clearCart, saveCart } from "../../redux/slices/cartSlice";
import { Button } from "../atoms";
import { useTranslation } from "react-i18next";

function getTotalPrice(arr) {
    let sum = 0;
    let subtotal = 1;
    for (let i = 0; i < arr.length; i++) {
        subtotal = arr[i].quantity * arr[i].product.price;
        sum += subtotal;
    }
    return sum;
};

function getTotal(obj) {
    return obj.product.price * obj.quantity;
};

const StyledCartItem = styled(Box)(() => ({
    width: 400,
    display: 'flex',
    alignItems: 'center',
    padding: '5px 10px',
    marginBottom: 20,
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

const StyledProductName = styled(Text)(({ theme }) => ({
    fontSize: '20px',
    color: 'black',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1, // Set the maximum number of lines before ellipsis
    overflow: 'hidden'
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
                                        <StyledProductName>{t('product')}: {name}</StyledProductName>
                                        <Text styles={{ fontSize: '20px' }}>{t('quantity')}: {quantity}</Text>
                                        <Text styles={{ fontSize: '20px', marginTop: '10px', fontWeight: 'bold' }}>{t('subtotal')}: {getTotal(item)}$</Text>
                                    </Box>
                                </StyledCartItem>
                            );
                        })}
                        <h3 style={{ fontSize: '22px', marginLeft: '25px' }}>{t('total')}: {getTotalPrice(cartItems)}$</h3>
                        <StyledButtonCointainer>
                            <Button onClick={() => {
                                dispatch(clearCart());
                                setIsCartOpen(false);
                            }}>{t('clear_cart')}</Button>
                            {userData && <Button onClick={() => {
                                dispatch(saveCart({ userId: userData?.user._id, cartItems }))
                            }}>{t('save')}</Button>}
                        </StyledButtonCointainer>
                    </>
                ) : (
                    <p>{t("no_items_in_the_cart")}</p>
                )}
            </LoadingWrapper>

        </Drawer>
    );
};
