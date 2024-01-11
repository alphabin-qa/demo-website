import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../utils/base-query";
import { getUserAccessToken } from "../utils/localstorage.helper";

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
    addAddress: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/address",
          body: data,
          headers: {
            authorization: `Bearer ${getUserAccessToken()}`,
          },
        };
      },
    }),
    getUser: builder.mutation({
      query: (data) => {
        return {
          method: "GET",
          url: "/me",
          body: data,
          headers: {
            authorization: `Bearer ${getUserAccessToken()}`,
          },
        };
      },
    }),
    updateUser: builder.mutation({
      query: (data) => {
        return {
          method: "PUT",
          url: "/updateUser",
          body: data,
          headers: {
            authorization: `Bearer ${getUserAccessToken()}`,
          },
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useAddAddressMutation,
  useGetUserMutation,
  useGetUpdateUserMutation,
} = authApi;
