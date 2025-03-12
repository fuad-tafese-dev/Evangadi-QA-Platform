import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    const isUserAuthenticated = !!token; // Check if token exists, user is authenticated

    return isUserAuthenticated ? <Outlet /> : <Navigate to="/login" replace />; // Redirect to login page if not authenticated
};

export default PrivateRoute;
