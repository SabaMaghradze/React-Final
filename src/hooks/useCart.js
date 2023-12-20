import { useSelector } from "react-redux"

export const useCart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const loading = useSelector((state) => state.cart.loading);
    const error = useSelector((state) => state.cart.error);
    const cartLength = useSelector((state) => state.cart.cartLength);

    return { cartItems, loading, error, cartLength };
};