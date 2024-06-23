import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./Components/DefaultLayout";
import GuestLayout from "./Components/GuestLayout";
import Login from "./View/login";
import Register from "./View/register";
import Users from "./View/users";
import UserForm from "./View/UserForm";
import ProtectedRoute from "./Components/ProtectedRoute";
import NotFound from "./View/404";
import UserView from "./View/UserView";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/users" />, // Redirect to /users
            },
            {
                element: <ProtectedRoute />, // Wrap the protected routes
                children: [
                    {
                        path: "/users",
                        element: <Users />,
                    },
                    {
                        path: "/users/new",
                        element: <UserForm key="UserCreate" />,
                    },
                    {
                        path: "/users/edit/:id",
                        element: <UserForm key="UserUpdate" />,
                    },
                    {
                        path: "/users/view/:id",
                        element: <UserView key="UserView" />,
                    },
                ],
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
