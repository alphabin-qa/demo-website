// third-party
import { combineReducers } from "redux";
import { authApi } from "../../services/authServices";

const reducers = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
});

export default reducers;
