import { api } from "../../config/api";
import {
  GET_POST_DETAILS_FAILURE,
  GET_POST_DETAILS_REQUEST,
  GET_POST_DETAILS_SUCCESS,
} from "./post.actionType";

export const fetchPostDetails = (postId) => async (dispatch) => {
  dispatch({ type: GET_POST_DETAILS_REQUEST });
  try {
    const response = await api.get(`/post/${postId}`);
    console.log("details",response)
    dispatch({ type: GET_POST_DETAILS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: GET_POST_DETAILS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
