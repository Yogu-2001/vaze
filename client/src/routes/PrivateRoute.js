import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const PrivateRoute = () => {
  const navigate = useNavigate();
  console.log("Hello");
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      const res = await axios.get(
        "http://localhost:8080/api/v1/auth/check-auth",
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RkMTkzZGUxNzdmYjAxZWI1NjQyODMiLCJpYXQiOjE2NzU0NDgwNTMsImV4cCI6MTY3NjA1Mjg1M30.VZHCaQVo2oqzv2xke0ADsaPT78SIJR5WD89ZUQCj_JI",
          },
        }
      );
      console.log(res);
      if (res.data.success) {
        console.log("hii");
        setOk(true);
      } else {
        setOk(false);
      }
    };

    checkAuth();
  }, [Cookies.get("token")]);

  return ok ? <Outlet /> : <Navigate to={"/"} />;
};

export default PrivateRoute;
