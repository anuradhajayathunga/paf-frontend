// Post Reducer with Fixed Save/Unsave Functionality

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
  SAVE_POST_REQUEST,
  SAVE_POST_SUCCESS,
  SAVE_POST_FAILURE,
  GET_SAVED_POSTS_REQUEST,
  GET_SAVED_POSTS_SUCCESS,
  GET_SAVED_POSTS_FAILURE,
  REMOVE_SAVED_POST_REQUEST,
  REMOVE_SAVED_POST_SUCCESS,
  REMOVE_SAVED_POST_FAILURE,
  SEARCH_POST_REQUEST,
  SEARCH_POST_SUCCESS,
  SEARCH_POST_FAILURE,
  CLEAR_SEARCH_RESULTS,
} from "./post.actionType";

const initialState = {
  posts: [],
  loading: false,
  error: null,
  post: [],
  userPosts: [],
  like: null,
  comment: null,
  comments: [],
  savedPosts: [],
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
    case GET_ALL_POST_REQUEST:
    case GET_POST_BY_USERID_REQUEST:
    case LIKE_POST_REQUEST:
    case UPDATE_POST_REQUEST:
    case DELETE_POST_REQUEST:
    case CREATE_COMMENT_REQUEST:
    case SAVE_POST_REQUEST:
    case REMOVE_SAVED_POST_REQUEST:
    case GET_SAVED_POSTS_REQUEST:
    case SEARCH_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ADD_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: [action.payload, ...state.post],
        posts: state.posts
          ? [action.payload, ...state.posts]
          : [action.payload],
        error: null,
      };

    case GET_ALL_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: null,
      };

    case GET_POST_BY_USERID_SUCCESS:
      return {
        ...state,
        loading: false,
        userPosts: action.payload,
        error: null,
      };

    case LIKE_POST_SUCCESS:
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts:
          state.posts?.map((post) =>
            post._id === action.payload._id ? action.payload : post
          ) || [],
        error: null,
      };

    case SAVE_POST_SUCCESS:
      // Update the specific post in the posts array to show it's now saved
      return {
        ...state,
        loading: false,
        posts:
          state.posts?.map((post) => {
            if (
              post._id === action.payload._id ||
              post._id === action.payload
            ) {
              // Add current user to savedByUsers array if not already included
              const updatedPost = { ...post };
              // Initialize savedByUsers array if it doesn't exist
              if (!updatedPost.savedByUsers) {
                updatedPost.savedByUsers = [];
              }
              // Add current user ID if it's not already in the array
              if (!updatedPost.savedByUsers.includes(action.payload.userId)) {
                updatedPost.savedByUsers.push(action.payload.userId);
              }
              return updatedPost;
            }
            return post;
          }) || [],
        error: null,
      };

    case REMOVE_SAVED_POST_SUCCESS:
      // Find the post by ID and remove current user from savedByUsers
      return {
        ...state,
        loading: false,
        posts:
          state.posts?.map((post) => {
            if (post._id === action.payload) {
              // Remove current user from savedByUsers array
              const updatedPost = { ...post };
              if (updatedPost.savedByUsers) {
                updatedPost.savedByUsers = updatedPost.savedByUsers.filter(
                  (userId) => userId !== action.payload.userId
                );
              }
              return updatedPost;
            }
            return post;
          }) || [],
        error: null,
      };

    case GET_SAVED_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        savedPosts: action.payload, // Store saved posts in dedicated field
        error: null,
      };

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts?.filter((post) => post._id !== action.payload) || [],
        error: null,
      };

    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comment: action.payload,
        // Update the comments array for the specific post
        posts:
          state.posts?.map((post) => {
            if (post._id === action.payload.postId) {
              return {
                ...post,
                comments: post.comments
                  ? [...post.comments, action.payload]
                  : [action.payload],
              };
            }
            return post;
          }) || [],
        error: null,
      };

    case SEARCH_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResults: action.payload,
        error: null,
      };

    case ADD_POST_FAILURE:
    case GET_ALL_POST_FAILURE:
    case GET_POST_BY_USERID_FAILURE:
    case LIKE_POST_FAILURE:
    case UPDATE_POST_FAILURE:
    case DELETE_POST_FAILURE:
    case SAVE_POST_FAILURE:
    case REMOVE_SAVED_POST_FAILURE:
    case GET_SAVED_POSTS_FAILURE:
    case CREATE_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SEARCH_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: [],
        error: null,
      };

    default:
      return state;
  }
};
