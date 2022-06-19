import { combineReducers } from "redux";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";

const RootReducer = combineReducers({
  productReducer,
  cartReducer,
});

export default RootReducer;
