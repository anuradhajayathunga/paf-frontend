import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  CREATE_COMMENT_SUCCESS,
  GET_ALL_POST_FAILURE,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
} from "./post.actionType";

const initialState = {
  posts: null,
  loading: false,
  error: null,
  post: [],
  like: null,
  comment: [],
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
    case GET_ALL_POST_REQUEST:
    case LIKE_POST_REQUEST:
    case UPDATE_POST_REQUEST:
    case DELETE_POST_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case ADD_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: [action.payload, ...state.post],
        error: null,
      };

    case GET_ALL_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
        comment: action.payload.comments,
        error: null,
      };

    case LIKE_POST_SUCCESS:
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        error: null,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload._id),
        loading: false,
      };

    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comment: [action.payload, ...state.comment],
        posts: state.posts.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
        error: null,
      };

    case ADD_POST_FAILURE:
    case GET_ALL_POST_FAILURE:
    case LIKE_POST_FAILURE:
    case UPDATE_POST_FAILURE:
    case DELETE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
