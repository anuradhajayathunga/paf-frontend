import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  UPDATE_PROFILE_SUCCESS, // ✅ Add this
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_FAILURE,
  LOGOUT_SUCCESS,
} from "./auth.actionType";

const initialState = {
  jwt: null,
  error: null,
  loading: false,
  user: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case GET_PROFILE_REQUEST:
    case UPDATE_PROFILE_REQUEST: // ✅ Include update loading
      return { ...state, loading: true, error: null };

    case GET_PROFILE_SUCCESS:
      return { ...state, user: action.payload, loading: false, error: null };

    case UPDATE_PROFILE_SUCCESS: // ✅ Update user with new profile data
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
        loading: false,
        error: null,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return { ...state, jwt: action.payload, loading: false, error: null };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case UPDATE_PROFILE_FAILURE: // ✅ Catch update errors
      return { ...state, loading: false, error: action.payload };
      case LOGOUT_SUCCESS:
        // Clear JWT from localStorage on logout
        localStorage.removeItem("jwt");
        return {
          ...initialState,
          jwt: null,
          user: null,
          isAuthenticated: false,
          loading: false,
          error: null,
        };

    default:
      return state;
  }
};
