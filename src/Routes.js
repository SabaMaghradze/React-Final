import { Route, Routes } from "react-router-dom";
import { Homepage, Login, SignUp } from './pages';

export const RoutesComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    );
};