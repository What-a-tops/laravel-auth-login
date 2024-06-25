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
            localStorage.clear();
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
            <Navigation users={users} logout={logout} />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default DefaultLayout;
