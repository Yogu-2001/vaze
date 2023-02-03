import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import AddStudent from "./pages/AddStudent";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import HomePage from "./pages/HomePage";
const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alert);
  if (!loading) {
    return (
      <>
        <Layout></Layout>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/admin/add-student" element={<AddStudent />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="" element={<Dashboard />} />
          </Route>
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
