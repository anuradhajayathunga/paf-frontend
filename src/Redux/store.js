import { legacy_createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
// import { authReducer } from "./Auth/auth.reducer";

const rootReducer = combineReducers({
  // auth: authReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
