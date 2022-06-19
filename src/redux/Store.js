import thunk from "redux-thunk";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import RootReducer from "./reducers/RootReducer";

const initialState = {};
const middlewares = [thunk];

export const Store = createStore(
  RootReducer,
  initialState,
  compose(applyMiddleware(...middlewares))
);
