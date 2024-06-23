/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
import { useStateContext } from "../Context/contextProvider";
import axiosClient from "../axiosClient";
import { useEffect } from "react";
import Navigation from "../View/Navigation";
import { Navigate, Outlet } from "react-router-dom";

function DefaultLayout() {
    let { token, user, setUser, setToken } = useStateContext();

    const checkSession = () => {
        const expiresAt = sessionStorage.getItem("expiresAt");
        if (expiresAt && new Date().getTime() > expiresAt) {
            logout();
        }
    };

    const logout = async (e) => {
        if (e) e.preventDefault();
        await axiosClient.get("/logout").then(() => {
            sessionStorage.clear();
            setUser(null);
            setToken(null);
        });
    };

    useEffect(() => {
        checkSession();
    }, [checkSession]);
    const users = (() => {
        try {
            return JSON.parse(user);
        } catch {
            return user;
        }
    })();

    if (!token) return <Navigate to="/login" />;

    return (
        <>
            {/* <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <Link to="/" className="text-white text-xl font-bold">
                            DADOTS
                        </Link>
                    </div>

                    <div className="flex items-center">
                        <label className="text-white mx-2 font-light">
                            {user.name}
                        </label>
                        <label className="text-white">|</label>
                        <Link
                            href="#"
                            onClick={logout}
                            className="text-white font-light mx-2 flex items-center p-2 rounded hover:bg-gray-700 hover:text-white transition-colors duration-200"
                        >
                            <ArrowRightEndOnRectangleIcon className="h-6 w-6 text-white mr-2" />
                            Logout
                        </Link>
                    </div>
                </div>
            </nav> */}
            <Navigation users={users} logout={logout} />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default DefaultLayout;
