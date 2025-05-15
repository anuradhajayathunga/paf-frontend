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
    console.log("AllPosts -->", data);
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

// ✅ Save a post for the authenticated user
export const savePostAction = (postId) => async (dispatch) => {
  dispatch({ type: SAVE_POST_REQUEST });

  try {
    const { data } = await api.post(`/api/user/save-post/${postId}`);
    dispatch({ type: SAVE_POST_SUCCESS, payload: data });
    console.log("Post saved successfully -->", data);
  } catch (error) {
    console.error("Error saving post -->", error);
    dispatch({
      type: SAVE_POST_FAILURE,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
    });
  }
};

// ✅ Remove a post from saved posts
export const removeSavedPostAction = (postId) => async (dispatch) => {
  dispatch({ type: REMOVE_SAVED_POST_REQUEST });

  try {
    const { data } = await api.delete(`/api/user/remove-saved-post/${postId}`);
    dispatch({ type: REMOVE_SAVED_POST_SUCCESS, payload: postId });
    console.log("Post removed from saved list -->", data);
  } catch (error) {
    console.error("Error removing saved post -->", error);
    dispatch({
      type: REMOVE_SAVED_POST_FAILURE,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
    });
  }
};

// ✅ Get all saved posts for the authenticated user
export const getSavedPostsAction = () => async (dispatch) => {
  dispatch({ type: GET_SAVED_POSTS_REQUEST });

  try {
    const { data } = await api.get(`/api/user/saved-posts`);
    dispatch({ type: GET_SAVED_POSTS_SUCCESS, payload: data });
    console.log("Saved posts fetched -->", data);
  } catch (error) {
    console.error("Error fetching saved posts -->", error);
    dispatch({
      type: GET_SAVED_POSTS_FAILURE,
      payload:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
    });
  }
};

//Search post
export const searchPostAction = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_POST_REQUEST }); // or create new SEARCH_POST_REQUEST
  try {
    const { data } = await api.get(
      `/search/post?query=${encodeURIComponent(query)}`
    );
    dispatch({ type: SEARCH_POST_SUCCESS, payload: data }); // or SEARCH_POST_SUCCESS
    console.log("Search results -->", data);
  } catch (error) {
    console.error("Error searching posts -->", error);
    dispatch({
      type: SEARCH_POST_FAILURE, // or SEARCH_POST_FAILURE
      payload:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
    });
  }
};

// COMMETNTS
export const createCommetAction = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_COMMENT_REQUEST });
  try {
    const { data } = await api.post(
      `api/comments/post/${reqData.postId}`,
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
