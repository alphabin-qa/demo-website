// third-party
import { combineReducers } from "redux";
import { authApi } from "../../services/authServices";
import userData from "./userData";

const reducers = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  userData,
});

export default reducers;
