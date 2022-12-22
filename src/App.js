import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageSignin from "./pages/signin";
import Dashboard from "./pages/dashboard";
import Categories from "./pages/categories";
import CategoriesCreate from "./pages/categories/create";
import CategoriesEdit from "./pages/categories/edit";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="signin" element={<PageSignin />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/categories" element={<Categories />} />
                <Route
                    path="/categories/create"
                    element={<CategoriesCreate />}
                />
                <Route
                    path="/categories/edit/:id"
                    element={<CategoriesEdit />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
