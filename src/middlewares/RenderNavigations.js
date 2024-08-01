// middlewares/RenderNavigations.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { nav } from './Navigastions';
import ProtectedRoute from './ProtectedRoutes';

export const RenderRoutes = () => {
    return (
        <Routes>
            {nav.map((r, i) => (
                <Route
                    key={i}
                    path={r.path}
                    element={<ProtectedRoute element={r.element} isPrivate={r.isPrivate} />}
                />
            ))}
        </Routes>
    );
};
