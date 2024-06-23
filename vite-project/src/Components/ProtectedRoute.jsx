/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../Context/contextProvider";

const ProtectedRoute = ({ redirectPath = "/login" }) => {
    const { token } = useStateContext();

    if (!token) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
