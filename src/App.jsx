import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PageNotFound from "./components/PageNotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AllComplaints from "./pages/AllComplaints";
import SingleComplaints from "./pages/SingleComplaints";
import NewCar from "./pages/NewCar";
import AllUsers from "./pages/AllUsers";
import AllCars from "./pages/AllCars";
import PrivateRoute from "./components/PrivateRoute";
import UserProfile from "./pages/UserProfile";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<PrivateRoute />} >
        <Route path="create" element={<NewCar />} />
        <Route path="cars" element={<AllComplaints />} />
        <Route path="cars/:id" element={<SingleComplaints />} />
        <Route path="admin/users" element={<AllUsers />} />
        <Route path="admin/singleUser" element={<UserProfile />} />
        <Route path="admin/cars" element={<AllCars />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
