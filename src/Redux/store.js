import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/auth.reducer";
import { postReducer } from "./Post/post.reducer";
import postDetailsReducer from "./Post/postDetailsReducer ";
import learningPlanReducer from "./LearningPlan/learnplan.reducer";

const rootReducers = combineReducers({
  // Add your reducers here

  // Example: user: userReducer,
  auth: authReducer,
  // Example: posts: postsReducer,
  post: postReducer,

  postDetails: postDetailsReducer,

  learningPlans: learningPlanReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
