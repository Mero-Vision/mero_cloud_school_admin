import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { refreshAccessToken } from "../apis/authApi";
import customToaster from "../utils/customToaster";
import { getToken } from "../utils/helpers";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers) => {
    const token = getToken()?.access_token;

    console.log({ token });
    if (token) {
      headers?.set("Authorization", `Bearer ${token}`);
      return headers;
    }
  },
});

export const customBaseQuery = () => {
  const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error && result?.error?.status === 401) {
      try {
        await refreshAccessToken();
        result = await baseQuery(args, api, extraOptions);
        if (result?.error) {
          customToaster({
            type: "danger",
            message: result?.error?.data?.message,
          });

          localStorage.clear();

          window.location.replace("/login");
        }
      } catch (error) {
        customToaster({
          type: "danger",
          message: result?.error?.data?.message,
        });

        window.location.replace("/login");
      }
    }
    return result;
  };
  return baseQueryWithReauth;
};
