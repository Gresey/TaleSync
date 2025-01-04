import React from "react";
import { Navigate } from "react-router-dom";
import { useSession } from "./context/SessionContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useSession(); 

  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
