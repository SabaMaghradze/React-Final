import { Route, Routes } from "react-router-dom";
import { Homepage, LoginPage, ProductFormPage, SignUpPage, SingleProductPage } from '../pages';
import { ProtectedRoute } from "./ProtectedRoute";
import { isAdmin } from "../helpers";
import { useUser } from '../hooks';
import { CategoriesPage } from "../pages";

export const RoutesComponent = () => {

    const { userData } = useUser();

    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/products/add" element={<ProtectedRoute hasAccess={isAdmin(userData)}><ProductFormPage /></ProtectedRoute>} />
            <Route path="/products/:id/edit" element={<ProtectedRoute hasAccess={isAdmin(userData)}><ProductFormPage />
            </ProtectedRoute>
            }
            />
            <Route path="/products/categories/:categoryName" element={<CategoriesPage />} />
            <Route path="/products/categories/:categoryName/:id" element={<SingleProductPage />} />
        </Routes>
    );
};