import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import { LOGIN_FAILURE, LOGIN_SUCCESS } from "./auth.actionType";

// Login Action
export const loginUserAction = (loginData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);

    if (data.token) {
      localStorage.setItem("jwt", data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: data.token });
    } else {
      throw new Error("JWT token not received.");
    }

    console.log("Login data:", data);
  } catch (error) {
    console.error("Login error:", error);

    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || error.message || "Login failed",
    });
  }
};

// Register Action
export const registerUserAction = (registerData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, registerData);

    if (data.token) {
      localStorage.setItem("jwt", data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: data.token });
    } else {
      throw new Error("JWT token not received.");
    }

    console.log("Registration data:", data);
  } catch (error) {
    console.error("Registration error:", error);

    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || error.message || "Registration failed",
    });
  }
};
