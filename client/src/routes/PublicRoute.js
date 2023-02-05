import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("authToken"))?.user);
  }, [user]);
  return user ? <Navigate to={"/dashboard"} /> : children;
};

export default PublicRoute;
