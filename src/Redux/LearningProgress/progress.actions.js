// progress.actions.js

import { api } from "../../config/api";
import {
  FETCH_PROGRESS_REQUEST,
  FETCH_PROGRESS_SUCCESS,
  FETCH_PROGRESS_FAILURE,
  CREATE_PROGRESS_REQUEST,
  CREATE_PROGRESS_SUCCESS,
  CREATE_PROGRESS_FAILURE,
  UPDATE_PROGRESS_REQUEST,
  UPDATE_PROGRESS_SUCCESS,
  UPDATE_PROGRESS_FAILURE,
  DELETE_PROGRESS_REQUEST,
  DELETE_PROGRESS_SUCCESS,
  DELETE_PROGRESS_FAILURE,
} from "./progress.actionTypes";

// Fetch all progress for current user
export const fetchUserProgress = () => async (dispatch) => {
  dispatch({ type: FETCH_PROGRESS_REQUEST });
  try {
    const { data } = await api.get("api/progress/me");
    dispatch({ type: FETCH_PROGRESS_SUCCESS, payload: data });
    console.log("Fetched user progress:", data);
    return data;
  } catch (error) {
    dispatch({
      type: FETCH_PROGRESS_FAILURE,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch progress",
    });
  }
};

// Create new progress
export const createProgress = (progressData) => async (dispatch) => {
  dispatch({ type: CREATE_PROGRESS_REQUEST });
  try {
    const { data } = await api.post("api/progress", progressData);
    dispatch({ type: CREATE_PROGRESS_SUCCESS, payload: data });
    console.log("Progress created:", data);
    return data;
  } catch (error) {
    dispatch({
      type: CREATE_PROGRESS_FAILURE,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Failed to create progress",
    });
  }
};

// Update progress
export const updateProgress = (id, progressData) => async (dispatch) => {
  dispatch({ type: UPDATE_PROGRESS_REQUEST });
  try {
    const { data } = await api.put(`api/progress/${id}`, progressData);
    dispatch({ type: UPDATE_PROGRESS_SUCCESS, payload: data });
    console.log("Progress updated:", data);
    return data;
  } catch (error) {
    dispatch({
      type: UPDATE_PROGRESS_FAILURE,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Failed to update progress",
    });
  }
};

// Delete progress
export const deleteProgress = (id) => async (dispatch) => {
  dispatch({ type: DELETE_PROGRESS_REQUEST });
  try {
    await api.delete(`api/progress/${id}`);
    dispatch({ type: DELETE_PROGRESS_SUCCESS, payload: id });
    console.log("Progress deleted:", id);
    return id;
  } catch (error) {
    dispatch({
      type: DELETE_PROGRESS_FAILURE,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Failed to delete progress",
    });
  }
};
