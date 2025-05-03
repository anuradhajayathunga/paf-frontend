import axios from "axios";
import { api, API_BASE_URL } from "../../config/api";
import {
  GET_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from "./auth.actionType";

// Login Action
export const loginUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);

    if (data.token) {
      // Store JWT in localStorage for persistence across refreshes
      localStorage.setItem("jwt", data.token);
      
      // Update Redux state
      dispatch({ type: LOGIN_SUCCESS, payload: data.token });
      
      // Optionally, fetch user profile after successful login
      dispatch(getProfileAction(data.token));
      
      return true;
    } else {
      throw new Error("JWT token not received.");
    }
  } catch (error) {
    console.error("Login error:", error);

    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || error.message || "Login failed",
    });
    
    return false;
  }
};

// Register Action
export const registerUserAction = (registerData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      registerData
    );

    if (data.token) {
      localStorage.setItem("jwt", data.token);
      dispatch({ type: REGISTER_SUCCESS, payload: data.token });
      // navigate("/login"); // Redirect to login page after successful registration
    } else {
      throw new Error("JWT token not received.");
    }

    console.log("Registration data:", data);
  } catch (error) {
    console.error("Registration error:", error);

    dispatch({
      type: REGISTER_FAILURE,
      payload:
        error.response?.data?.message || error.message || "Registration failed",
    });
  }
};

// Get profile Action
export const getProfileAction = (token) => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Profile data:", data);
    dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.error(" error:", error);

    dispatch({
      type: GET_PROFILE_FAILURE,
      payload:
        error.response?.data?.message || error.message || "Registration failed",
    });
  }
};

// Update profile Action
export const updateProfileAction = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });
  try {
    const { data } = await api.put(`${API_BASE_URL}/api/update-user`, reqData);

    console.log("Update profile data:", data);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.error(" error:", error);

    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload:
        error.response?.data?.message || error.message || "Registration failed",
    });
  }
};

// Logout Action
export const logoutUserAction = () => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  try {
    localStorage.removeItem("jwt");

    dispatch({ type: LOGOUT_SUCCESS });

    return true;
  } catch (error) {
    console.error("Logout error:", error);

    dispatch({
      type: LOGOUT_FAILURE,
      payload:
        error.response?.data?.message || error.message || "Logout failed",
    });

    return false;
  }
};
