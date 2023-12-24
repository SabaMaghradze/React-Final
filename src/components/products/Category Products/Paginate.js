import { Pagination } from "@mui/material";

export const Paginate = ({ currentPage, changePage, totalPages }) => {
    return <Pagination count={totalPages} page={Number(currentPage)} onChange={(_, value) => {
        changePage('page', value);
    }} />
};
