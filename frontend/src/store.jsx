import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { isRejectedWithValue } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";
import reducers from "./store/reducers/index";
import { authApi } from "./services/authServices";
import {
  removeAuthToken,
  removeUserAccessToken,
} from "./utils/localstorage.helper";

export const rtkQueryErrorLogger = () => (next) => async (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (
    isRejectedWithValue(action) &&
    action.payload?.data?.error?.message === "Invalid auth token"
  ) {
    removeAuthToken();
    removeUserAccessToken();
    window.location.href = "/login";
  }

  return next(action);
};

export const store = configureStore({
  reducer: reducers,

  // {
  //   // Add the generated reducer as a specific top-level slice
  //   [userApi.reducerPath]: userApi.reducer,
  // },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(rtkQueryErrorLogger),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
