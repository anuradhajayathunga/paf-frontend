import { api } from "../../config/api";
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  GET_ALL_POST_FAILURE,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  GET_POST_BY_USERID_FAILURE,
  GET_POST_BY_USERID_REQUEST,
  GET_POST_BY_USERID_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
} from "./post.actionType";

export const createPostAction = (postData) => async (dispatch) => {
  dispatch({ type: ADD_POST_REQUEST });
  try {
    const { data } = await api.post("api/posts", postData);
    dispatch({ type: ADD_POST_SUCCESS, payload: data });
    console.log("Post created successfully", data);
  } catch (error) {
    dispatch({
      type: ADD_POST_FAILURE,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
    });
    console.error("Error creating post", error);
  }
};

export const getAllPostAction = () => async (dispatch) => {
  dispatch({ type: GET_ALL_POST_REQUEST });
  try {
    const { data } = await api.get("/posts");
    dispatch({ type: GET_ALL_POST_SUCCESS, payload: data });
    // console.log("Posts -->", data);
  } catch (error) {
    console.error("Error getting posts -->", error);
    dispatch({
      type: GET_ALL_POST_FAILURE,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
    });
  }
};

export const getUserPostAction = (userId) => async (dispatch) => {
  dispatch({ type: GET_POST_BY_USERID_REQUEST });
  try {
    const { data } = await api.get(`/post/user/${userId}`);
    dispatch({ type: GET_POST_BY_USERID_SUCCESS, payload: data });
    console.log("User Posts -->", data);
  } catch (error) {
    dispatch({
      type: GET_POST_BY_USERID_FAILURE,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
    });
    console.error("Error getting user posts -->", error);
  }
};

export const likePostAction = (postId) => async (dispatch) => {
  dispatch({ type: LIKE_POST_REQUEST });
  try {
    const { data } = await api.put(`/post/like/${postId}`);
    dispatch({ type: LIKE_POST_SUCCESS, payload: data });
    console.log("Like -->", data);
  } catch (error) {
    dispatch({
      type: LIKE_POST_FAILURE,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
    });
    console.error("Error liking post -->", error);
  }
};

export const updatePostAction = (postId, updatedData) => async (dispatch) => {
  dispatch({ type: UPDATE_POST_REQUEST });
  try {
    const { data } = await api.put(`/api/update/posts/${postId}`, updatedData);
    dispatch({ type: UPDATE_POST_SUCCESS, payload: data });
    console.log("Post updated successfully", data);
  } catch (error) {
    dispatch({
      type: UPDATE_POST_FAILURE,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
    });
    console.error("Error updating post", error);
  }
};

export const deletePostAction = (postId) => async (dispatch) => {
  dispatch({ type: DELETE_POST_REQUEST });
  try {
    await api.delete(`/api/delete/posts/${postId}`);
    dispatch({ type: DELETE_POST_SUCCESS, payload: { _id: postId } });
    console.log("Post deleted successfully");
  } catch (error) {
    dispatch({
      type: DELETE_POST_FAILURE,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
    });
    console.error("Error deleting post", error);
  }
};

// COMMETNTS
export const createCommetAction = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_COMMENT_REQUEST });
  try {
    const { data } = await api.post(
      `/api/comment/post/${reqData.postId}`,
      reqData.data
    );
    dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data });
    console.log("comment created successfully", data);
  } catch (error) {
    dispatch({
      type: CREATE_COMMENT_FAILURE,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
    });
    console.error("Error", error);
  }
};
