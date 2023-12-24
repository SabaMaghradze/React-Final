import { useState } from 'react';
import { axiosInstance } from '../helpers';
import { useCallback } from 'react';

export const useFetch = () => {

    const [state, setState] = useState({
        loading: false,
        data: null,
        error: null
    });

    const getData = useCallback(async (url) => {
        try {
            setState((prev) => ({ ...prev, loading: true }));
            const { data } = await axiosInstance.get(url);
            setState((prev) => ({ ...prev, loading: false, data }));
        } catch (error) {
            setState((prev) => ({ ...prev, loading: false, error: true }));
        };
    }, []);

    return { ...state, getData, setState };

};
