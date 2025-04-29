import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/auth.reducer";

const rootReducers = combineReducers({
  // Add your reducers here
  // Example: user: userReducer,
  auth: authReducer
  // Example: product: productReducer,
  // Example: cart: cartReducer,
  // Example: order: orderReducer,
  // Example: review: reviewReducer,
  // Example: wishlist: wishlistReducer,
  // Example: notification: notificationReducer,
  // Example: auth: authReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
