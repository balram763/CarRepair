import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const useAuthStatus = () => {
  const { user } = useSelector((state) => state.auth);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
          const userExist = JSON.parse(localStorage.getItem('user'))
          if (!userExist) {
            navigate("/register");
          }
          dispatch(checkLogin())
        }
    user ? setIsLoggedIn(true) : setIsLoggedIn(false);
    setChecking(false);
  }, [user]);

  return { isLoggedIn, checking };
};

export default useAuthStatus;
