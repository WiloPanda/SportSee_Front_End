import React, { lazy } from 'react';
import { createBrowserRouter, Navigate } from "react-router-dom";

// Lazy loading des composants
const Layout = lazy(() => import('../Layout/Layout'));
const UserProfile = lazy(() => import('../Pages/Private/UserProfile'));

const publicRouter = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Navigate to="/userprofile" replace />
            },
            {
                path: "userprofile",
                element: <UserProfile />,
            }
        ]
    }
]);

export default publicRouter;