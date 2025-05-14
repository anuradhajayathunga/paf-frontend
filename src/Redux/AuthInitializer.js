import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAuthAction } from "./Auth/auth.action";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize auth state when component mounts
    dispatch(initializeAuthAction());
  }, [dispatch]);

  return children;
};

export default AuthInitializer;