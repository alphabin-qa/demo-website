import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../config/config.jsx";
import { getAuthToken } from "../utils/localstorage.helper.jsx";

export const baseQuery = fetchBaseQuery({
  baseUrl: config.API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = getAuthToken();
    const authorization = headers.get("Authorization");
    if (token && !authorization) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
