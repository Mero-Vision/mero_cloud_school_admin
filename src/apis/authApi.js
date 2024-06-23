import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { mainApi } from "./mainApi";
const localArray = [
   "mero_cloud_super_admin_access_token",
   "mero_cloud_super_admin_refresh_token",
   "user",
   "company",
];
export const authSlice = createSlice({
   name: "auth",
   initialState: {},
   reducers: {
      authSuccess: (state, action) => action.payload,
      logout: (state, action) => {
         localArray?.map((item) => localStorage.removeItem(item));
      },
   },
});

export const { authSuccess, logout } = authSlice.actions;

export const authApi = mainApi.injectEndpoints({
   tagTypes: ["Auth"],

   endpoints: (builder) => ({
      userLogin: builder.mutation({
         query: (data) => ({
            url: `/api/superadmin/login`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: ["Auth"],
         onSuccess: (response, variables, context) => {
            context.dispatch(authSuccess(response));
            console.log({ context });
         },
      }),
      resetPassword: builder.mutation({
         query: (data) => ({
            url: `/api/admin/reset-password`,
            method: "POST",
            body: data,
         }),
      }),
   }),
});

export const { useUserLoginMutation, useResetPasswordMutation } =
   authApi;

export const refreshAccessToken = async () => {
   const refresh_token = localStorage.getItem(
      "mero_cloud_super_admin_refresh_token"
   );

   try {
      const response = await axios.post(
         `${
            import.meta.env.VITE_BASE_URL
         }/api/superadmin/refresh-token/${refresh_token}`
      );

      if (response?.data) {
         localStorage.setItem(
            "mero_cloud_super_admin_access_token",
            response?.data?.data?.token
         );

         localStorage.setItem(
            "mero_cloud_super_admin_refresh_token",
            response?.data?.data?.refresh_token
         );
      }
   } catch (err) {
      console.log({ err });
   }
};
