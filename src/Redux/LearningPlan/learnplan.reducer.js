// learnplan.reducer.js - Redux reducer for learning plans

import {
  FETCH_PLANS_REQUEST,
  FETCH_PLANS_SUCCESS,
  FETCH_PLANS_FAILURE,
  FETCH_PLAN_REQUEST,
  FETCH_PLAN_SUCCESS,
  FETCH_PLAN_FAILURE,
  CREATE_PLAN_REQUEST,
  CREATE_PLAN_SUCCESS,
  CREATE_PLAN_FAILURE,
  UPDATE_PLAN_REQUEST,
  UPDATE_PLAN_SUCCESS,
  UPDATE_PLAN_FAILURE,
  DELETE_PLAN_REQUEST,
  DELETE_PLAN_SUCCESS,
  DELETE_PLAN_FAILURE
} from './learnplan.actionTypes';

const initialState = {
  plans: [],
  currentPlan: null,
  loading: false,
  error: null,
  success: false
};

const learningPlanReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch all plans cases
    case FETCH_PLANS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false
      };
    case FETCH_PLANS_SUCCESS:
      return {
        ...state,
        loading: false,
        plans: action.payload,
        error: null,
        success: true
      };
    case FETCH_PLANS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      };
      
    // Fetch single plan cases
    case FETCH_PLAN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false
      };
    case FETCH_PLAN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentPlan: action.payload,
        error: null,
        success: true
      };
    case FETCH_PLAN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      };
      
    // Create plan cases
    case CREATE_PLAN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false
      };
    case CREATE_PLAN_SUCCESS:
      return {
        ...state,
        loading: false,
        plans: [...state.plans, action.payload],
        error: null,
        success: true
      };
    case CREATE_PLAN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      };
      
    // Update plan cases
    case UPDATE_PLAN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false
      };
    case UPDATE_PLAN_SUCCESS:
      return {
        ...state,
        loading: false,
        plans: state.plans.map(plan => 
          plan.id === action.payload.id ? action.payload : plan
        ),
        currentPlan: action.payload,
        error: null,
        success: true
      };
    case UPDATE_PLAN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      };
      
    // Delete plan cases
    case DELETE_PLAN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false
      };
    case DELETE_PLAN_SUCCESS:
      return {
        ...state,
        loading: false,
        plans: state.plans.filter(plan => plan.id !== action.payload),
        currentPlan: null,
        error: null,
        success: true
      };
    case DELETE_PLAN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      };
      
    default:
      return state;
  }
};

export default learningPlanReducer;