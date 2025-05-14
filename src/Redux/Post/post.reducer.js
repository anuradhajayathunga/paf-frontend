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
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_REQUEST,
  GET_POST_BY_USERID_REQUEST,
  GET_POST_BY_USERID_SUCCESS,
  GET_POST_BY_USERID_FAILURE,
  SAVE_POST_FAILURE,
  SAVE_POST_SUCCESS,
  SAVE_POST_REQUEST,
} from "./post.actionType";

const initialState = {
  posts: null,
  loading: false,
  error: null,
  post: [],
  userPosts: [],
  like: null,
  comment: null,
  comments: [],
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
    case GET_ALL_POST_REQUEST:
    case GET_POST_BY_USERID_REQUEST:
    case LIKE_POST_REQUEST:
    case UPDATE_POST_REQUEST:
    case DELETE_POST_REQUEST:
    case SAVE_POST_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case CREATE_COMMENT_REQUEST:
      return { ...state, loading: true };

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
        comments: action.payload.comments,
        error: null,
      };
    case GET_POST_BY_USERID_SUCCESS:
      return { ...state, loading: false, userPosts: action.payload };

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
      return { loading: false, comment: action.payload, error: null };

    case SAVE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case ADD_POST_FAILURE:
    case GET_ALL_POST_FAILURE:
    case GET_POST_BY_USERID_FAILURE:
    case SAVE_POST_FAILURE:
    case LIKE_POST_FAILURE:
    case UPDATE_POST_FAILURE:
    case DELETE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_COMMENT_FAILURE:
      return { loading: false, comment: null, error: action.payload };
    default:
      return state;
  }
};
