import { mainApi } from "./mainApi";

export const reportsApi = mainApi.injectEndpoints({
  tagTypes: ["Reports"],
  endpoints: (builder) => ({
    getReports: builder.query({
      query: (params) => ({
        url: `/api/admin/report`,
        params: {
          ...params,
        },
      }),
      providesTags: ["Reports"],
    }),
  }),
});

export const { useGetReportsQuery } = reportsApi;
