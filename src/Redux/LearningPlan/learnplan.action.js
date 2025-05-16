// learnplan.actions.js - Redux actions for learning plan management

import { api } from "../../config/api";

// Action types
export const FETCH_PLANS_REQUEST = 'FETCH_PLANS_REQUEST';
export const FETCH_PLANS_SUCCESS = 'FETCH_PLANS_SUCCESS';
export const FETCH_PLANS_FAILURE = 'FETCH_PLANS_FAILURE';

export const FETCH_PLAN_REQUEST = 'FETCH_PLAN_REQUEST';
export const FETCH_PLAN_SUCCESS = 'FETCH_PLAN_SUCCESS';
export const FETCH_PLAN_FAILURE = 'FETCH_PLAN_FAILURE';

export const CREATE_PLAN_REQUEST = 'CREATE_PLAN_REQUEST';
export const CREATE_PLAN_SUCCESS = 'CREATE_PLAN_SUCCESS';
export const CREATE_PLAN_FAILURE = 'CREATE_PLAN_FAILURE';

export const UPDATE_PLAN_REQUEST = 'UPDATE_PLAN_REQUEST';
export const UPDATE_PLAN_SUCCESS = 'UPDATE_PLAN_SUCCESS';
export const UPDATE_PLAN_FAILURE = 'UPDATE_PLAN_FAILURE';

export const DELETE_PLAN_REQUEST = 'DELETE_PLAN_REQUEST';
export const DELETE_PLAN_SUCCESS = 'DELETE_PLAN_SUCCESS';
export const DELETE_PLAN_FAILURE = 'DELETE_PLAN_FAILURE';

// Fetch all learning plans for current user
export const fetchUserPlans = () => async (dispatch) => {
  dispatch({ type: FETCH_PLANS_REQUEST });
  try {
    const { data } = await api.get("api/plans/user");
    dispatch({ type: FETCH_PLANS_SUCCESS, payload: data });
    console.log("All learning plans -->", data);
    return data;
  } catch (error) {
    console.error("Error fetching learning plans -->", error);
    dispatch({
      type: FETCH_PLANS_FAILURE,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch learning plans",
    });
  }
};

// Fetch a specific learning plan by ID
export const fetchPlanById = (planId) => async (dispatch) => {
  dispatch({ type: FETCH_PLAN_REQUEST });
  try {
    const { data } = await api.get(`api/plans/${planId}`);
    dispatch({ type: FETCH_PLAN_SUCCESS, payload: data });
    console.log("Learning plan details -->", data);
    return data;
  } catch (error) {
    console.error("Error fetching learning plan details -->", error);
    dispatch({
      type: FETCH_PLAN_FAILURE,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch learning plan details",
    });
  }
};

// Create a new learning plan
export const createLearningPlan = (planData) => async (dispatch) => {
  dispatch({ type: CREATE_PLAN_REQUEST });
  try {
    const { data } = await api.post("api/plans", planData);
    dispatch({ type: CREATE_PLAN_SUCCESS, payload: data });
    console.log("Learning plan created successfully", data);
    return data;
  } catch (error) {
    console.error("Error creating learning plan -->", error);
    dispatch({
      type: CREATE_PLAN_FAILURE,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Failed to create learning plan",
    });
  }
};

// Update an existing learning plan
export const updateLearningPlan = (planId, planData) => async (dispatch) => {
  dispatch({ type: UPDATE_PLAN_REQUEST });
  try {
    const { data } = await api.put(`api/plans/${planId}`, planData);
    dispatch({ type: UPDATE_PLAN_SUCCESS, payload: data });
    console.log("Learning plan updated successfully", data);
    return data;
  } catch (error) {
    console.error("Error updating learning plan -->", error);
    dispatch({
      type: UPDATE_PLAN_FAILURE,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Failed to update learning plan",
    });
  }
};

// Delete a learning plan
export const deleteLearningPlan = (planId) => async (dispatch) => {
  dispatch({ type: DELETE_PLAN_REQUEST });
  try {
    await api.delete(`api/plans/${planId}`);
    dispatch({ type: DELETE_PLAN_SUCCESS, payload: planId });
    console.log("Learning plan deleted successfully", planId);
    return planId;
  } catch (error) {
    console.error("Error deleting learning plan -->", error);
    dispatch({
      type: DELETE_PLAN_FAILURE,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Failed to delete learning plan",
    });
  }
};