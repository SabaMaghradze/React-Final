import { useSearchParams } from "react-router-dom";

export const useQueryParams = (key) => {
    const [params, setParams] = useSearchParams();

    function changeQueryValue(key, value) {
        params.set(key, value);
        setParams(params);
    };

    return {
        value: params.get(key),
        changeQueryValue
    };
};