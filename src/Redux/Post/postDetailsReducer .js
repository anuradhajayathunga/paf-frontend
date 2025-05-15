import {
  GET_POST_DETAILS_FAILURE,
  GET_POST_DETAILS_REQUEST,
  GET_POST_DETAILS_SUCCESS,
} from "./post.actionType";

const initialState = {
  post: null,
  loading: false,
  error: null,
};

const postDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_POST_DETAILS_SUCCESS:
      return { ...state, loading: false, post: action.payload };
    case GET_POST_DETAILS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default postDetailsReducer;
