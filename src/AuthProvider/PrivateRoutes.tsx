import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({children}) => {
    const isLogged = localStorage.getItem("isLogged") === "true";
    return isLogged ? children : <Navigate to="/login"/>
}