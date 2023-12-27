import { Autocomplete, Box, TextField, styled } from "@mui/material";
import { Link, Loading, Text } from "../atoms";
import { useEffect, useState } from "react";
import { useDebounce, useFetch } from "../../hooks";

const StyledImage = styled('img')(() => ({
    width: 50,
    height: 50,
    objectFit: 'cover'
}));

export const SearchBar = () => {

    const [searchValue, setSearchValue] = useState('test');

    const debouncedValue = useDebounce(500, searchValue);

    const { getData, data, loading, setState } = useFetch();

    const { products } = data || {};

    useEffect(() => {
        if (!debouncedValue) {
            setState((prev) => ({ ...prev, data: null }));
        } else {
            getData(`/products/search?name=${debouncedValue}`);
        };
    }, [debouncedValue, getData]);

    return <Autocomplete
        freeSolo
        disableClearable
        sx={{ width: 300 }}
        loading={loading}
        options={products || []}
        noOptionsText={'Could not find such product'}
        loadingText={<Loading size={50} />}
        getOptionLabel={(option) => option.name}
        renderOption={(_, option) => {
            const { category, _id, name, price, image } = option;
            return (
                <Link to={`/products/categories/${category}/${_id}`}>
                    <Box sx={{ display: 'flex' }}>
                        <StyledImage src={image} />
                        <Text>{name}</Text>
                    </Box>
                </Link>
            )
        }}
        renderInput={(params) => {
            return (
                <TextField {...params} value={searchValue} onChange={(e) => {
                    setSearchValue(e.target.value);
                }}
                    label='Search Product' InputProps={{ ...params.InputProps, type: 'search' }} sx={{ input: { color: '#FF9900' } }} InputLabelProps={{ style: { color: '#FF9900' } }} />
            )
        }}
    />
};
