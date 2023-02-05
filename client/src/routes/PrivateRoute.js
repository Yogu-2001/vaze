import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
const PrivateRoute = ({ children }) => {
  console.log("called");
  const navigate = useNavigate();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      const res = await axios.get(
        "http://localhost:8080/api/v1/auth/check-auth",
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("authToken"))?.token,
          },
        }
      );
      console.log(res);
      if (res.data.success) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    checkAuth();
  }, []);

  return ok ? children : <Spinner />;
};

export default PrivateRoute;