import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { reset } from "../features/car/carSlice";
import { checkLogin } from "../features/auth/authSlice";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {


    if (!user) {
      const userExist = JSON.parse(localStorage.getItem('user'))
      if (!userExist) {
        navigate("/register");
      }
      dispatch(checkLogin())
    }

    dispatch(reset());
  }, [user]);

  if (user?.isAdmin) {
    return (
      <div className="container p-5">
        <h1 className="text-center">Welcome {user?.name}!</h1>

        <div className="card p-3">
          <h3 className="text-center text-secondary my-3">
            Select Any Option From Here
          </h3>
          <Link to={"/admin/users"} className="btn btn-outline-dark my-1">
            View All Users
          </Link>
          <Link to={"/admin/cars"} className="btn btn-outline-dark my-1">
            View All Job Cards
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container p-5">
      <h1 className="text-center">Welcome {user?.name}!</h1>

      <div className="card p-3">
        <h3 className="text-center text-secondary my-3">
          Select Any Option From Here
        </h3>
        <Link to={"/create"} className="btn btn-outline-dark my-1">
          Create Job Card
        </Link>
        <Link to={"/cars"} className="btn btn-outline-dark my-1">
          View Job Cards
        </Link>
      </div>
    </div>
  );
};

export default Home;
