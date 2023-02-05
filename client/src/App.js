import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import AddStudent from "./pages/admin/AddStudent";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import HomePage from "./pages/HomePage";
import AdminRoute from "./routes/AdminRoute";
import PublicRoute from "./routes/PublicRoute";
import { setToken, setUser } from "./redux/features/authSlice";
const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alert);

  useEffect(() => {
    JSON.parse(localStorage.getItem("authToken"))
      ? dispatch(setUser(JSON.parse(localStorage.getItem("authToken"))?.user))
      : dispatch(setUser(null));

    JSON.parse(localStorage.getItem("authToken"))
      ? dispatch(setToken(JSON.parse(localStorage.getItem("authToken"))?.token))
      : dispatch(setToken(""));
  }, [localStorage.getItem("authToken")]);

  if (!loading) {
    return (
      <>
        <Layout></Layout>

        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route path="/homepage" element={<HomePage />} />
          <Route
            path="/admin/add-student"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <AddStudent />
                </AdminRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </>
    );
  } else {
    return (
      <>
        <Layout></Layout>
        <h1>Loading...</h1>;
      </>
    );
  }
};

export default App;
