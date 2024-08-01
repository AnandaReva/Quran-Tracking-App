 
// middlewares/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthWrapper';

const ProtectedRoute = ({ element, isPrivate }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    

    if (!isPrivate && user.isAuthenticated) {
        return <Navigate to={location.state?.from?.pathname || "/"} replace />;
    }

    if (isPrivate && !user.isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return element;
};

export default ProtectedRoute;
