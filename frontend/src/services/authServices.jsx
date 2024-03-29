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
    getUpdateUser: builder.mutation({
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
    createOrder: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/createOrder",
          body: data,
        };
      },
    }),
    getOrderDetails: builder.mutation({
      query: (id) => {
        return {
          method: "GET",
          url: `/findOrder/${id}`,
          headers: {
            authorization: `Bearer ${getUserAccessToken()}`,
          },
        };
      },
    }),
    getCancleOrder: builder.mutation({
      query: (data) => {
        return {
          method: "PUT",
          url: "/cancleOrder",
          body: data,
          headers: {
            authorization: `Bearer ${getUserAccessToken()}`,
          },
        };
      },
    }),
    getUpdateAddress: builder.mutation({
      query: (data) => {
        return {
          method: "PUT",
          url: "/updateAddress",
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
  useCreateOrderMutation,
  useGetOrderDetailsMutation,
  useAddAddressMutation,
  useGetUserMutation,
  useGetUpdateUserMutation,
  useGetCancleOrderMutation,
  useGetUpdateAddressMutation,
} = authApi;
