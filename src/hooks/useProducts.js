import { useSelector } from "react-redux";

export const useProduct = () => {
    
    const homeProducts = useSelector((state) => state.product.homeProducts);
    const loading = useSelector((state) => state.product.loading);
    const selectedProduct = useSelector((state) => state.product.selectedProduct);

    return { homeProducts, loading, selectedProduct };
};