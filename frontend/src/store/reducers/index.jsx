// third-party
import { combineReducers } from "redux";
import { authApi } from "../../services/authServices";
import userData from "./userData";
import wishlistItems from "./wishListItems";

const reducers = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  userData,
  wishlists: wishlistItems,
});

export default reducers;
