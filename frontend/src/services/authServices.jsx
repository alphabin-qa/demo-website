import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../utils/base-query";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Auth"],
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/login",
          body: data,
        };
      },
    }),
    signup: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/register",
          body: data,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
