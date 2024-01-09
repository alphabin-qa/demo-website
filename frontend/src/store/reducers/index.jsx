// third-party
import { combineReducers } from "redux";
import { authApi } from "../../services/authServices";
import userData from "./userData";
import wishlistItems from "./wishListItems";
import cartItems from "./cartItems";

const reducers = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  userData,
  wishlists: wishlistItems,
  cartlists: cartItems,
});

export default reducers;
