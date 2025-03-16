import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loginUser } from "../features/auth/authSlice";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password} = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }

    if (isError && message) {
      toast.error(message);
    }
  }, [user, isSuccess, message, isError]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container p-5">
      <h1 className="text-center">LogIN Here</h1>

      <div className="card p-3 rounded-0 my-3">
        <form onSubmit={handleSubmit}>
          
          <input
            onChange={handleChange}
            value={email}
            name="email"
            type="email"
            placeholder="Enter Your email"
            className="form-control my-2 rounded-0"
          />
          <input
            value={password}
            name="password"
            minLength={8}
            maxLength={15}
            onChange={handleChange}
            type="password"
            placeholder="Type Password"
            className="form-control my-2 rounded-0"
          />

          <button className="btn btn-dark rounded-0 my-2 w-100">
            login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
