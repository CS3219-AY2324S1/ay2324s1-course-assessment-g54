import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LinearProgress from "@mui/material/LinearProgress";

import { useUser, useUserDispatch } from "../contexts/UserContext";

const AuthGuard = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const user = useUser();
  const dispatch = useUserDispatch();

  useEffect(() => {
    const verifyAndFetchUser = async () => {
      const token = window.localStorage.getItem("token");
      if (!token) return navigate("/login");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_USERS_SERVICE_HOST}/profile`,
          { headers: { Authorization: token } }
        );
        if (!response.data) return navigate("/login");
        dispatch({ type: "set", user: response.data });
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
        navigate("/login");
      }
    };

    verifyAndFetchUser();
  }, [navigate, dispatch]);

  if (isLoading) return <LinearProgress variant="indeterminate" />;
  if (!user) return <LinearProgress variant="indeterminate" />;

  return <>{children}</>;
};

export default AuthGuard;
