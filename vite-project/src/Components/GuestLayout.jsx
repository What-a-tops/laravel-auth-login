import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../Context/contextProvider";

function GuestLayout() {
    const { token } = useStateContext();
    if (token) return <Navigate to="/" />;
    return (
        <>
            <div></div>
            <Outlet />
        </>
    );
}

export default GuestLayout;
