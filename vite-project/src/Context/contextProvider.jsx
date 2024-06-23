/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const stateContext = createContext({
    user: null,
    token: null,
    eid: "",
    setUser: () => {},
    setToken: () => {},
    setEid: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, _setUser] = useState(localStorage.getItem("USER_INFO"));
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [eid, _setEID] = useState(localStorage.getItem("EID"));

    const setToken = (token) => {
        _setToken(token);

        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN", token);
        }
    };

    const setEid = (eid) => {
        _setEID(eid);

        if (token) {
            localStorage.setItem("EID", token);
        } else {
            localStorage.removeItem("EID", token);
        }
    };

    const setUser = (user) => {
        _setUser(user);

        if (user) {
            localStorage.setItem("USER_INFO", JSON.stringify(user));
        } else {
            localStorage.removeItem("USER_INFO", JSON.stringify(user));
        }
    };

    return (
        <stateContext.Provider
            value={{
                user,
                token,
                eid,
                setUser,
                setToken,
                setEid,
            }}
        >
            {children}
        </stateContext.Provider>
    );
};

export const useStateContext = () => useContext(stateContext);
