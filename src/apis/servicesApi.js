import { mainApi } from "./mainApi";

export const serviceApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: (params) => ({
        url: "api/superadmin/service",
        params,
      }),
    }),
  }),
});

export const { useGetServicesQuery } = serviceApi;
