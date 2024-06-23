import React from "react";
import ReactDOM from "react-dom/client";
import router from "./router";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ContextProvider } from "./Context/contextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ContextProvider>
            <RouterProvider router={router}></RouterProvider>
        </ContextProvider>
    </React.StrictMode>
);
