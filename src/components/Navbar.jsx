import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOutUser } from "../features/auth/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOutUser());
  };

  return (
    <nav className="navbar bg-light shadow-lg">
      <div className="container-fluid">
        <Link to={"/"}>
          <span className="navbar-brand mb-0 h1">CaRepair</span>
        </Link>
        <span className="float-end">
          {user ? (
            <button onClick={handleLogOut} className="btn btn-danger btn-sm">
              Logout
            </button>
          ) : (
            <>
              <Link
                to={"/register"}
                className="btn btn-outline-dark btn-sm rounded-0"
              >
                Register
              </Link>
              <Link
                to={"/login"}
                className="btn btn-outline-dark btn-sm mx-2 rounded-0"
              >
                Login
              </Link>
            </>
          )}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
