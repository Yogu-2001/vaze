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
import CreateProfile from "./pages/student/CreateProfile";
import AddNotice from "./pages/admin/AddNotice";
import AddPlacement from "./pages/admin/AddPlacement";
import AllStudentsTable from "./pages/admin/AllStudentsTable";
import AllDrivesTable from "./pages/student/AllDrivesTable";
const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alert);

  useEffect(() => {
    console.log(localStorage.getItem("authToken"));
    localStorage.getItem("authToken")
      ? dispatch(setUser(JSON.parse(localStorage.getItem("authToken"))?.user))
      : dispatch(setUser(null));

    localStorage.getItem("authToken")
      ? dispatch(setToken(JSON.parse(localStorage.getItem("authToken"))?.token))
      : dispatch(setToken(""));
  }, []);

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
              <AdminRoute>
                <AddStudent />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/all-students"
            element={
              <AdminRoute>
                <AllStudentsTable />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/add-notice/"
            element={
              <AdminRoute>
                <AddNotice />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/add-drive/"
            element={
              <AdminRoute>
                <AddPlacement />
              </AdminRoute>
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
          <Route
            path="/student/all-drives"
            element={
              <PrivateRoute>
                <AllDrivesTable />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-profile"
            element={
              <PrivateRoute>
                <CreateProfile />
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
