import { useSelector } from "react-redux";

export const useUser = () => {
    const userData = useSelector((state) => state.user.userData);
    const loading = useSelector((state) => state.user.loading);

    return (
        userData, loading
    );
}