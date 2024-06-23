import { mainApi } from "./mainApi";

export const bankApi = mainApi.injectEndpoints({
  tagTypes: ["Banks"],
  endpoints: (builder) => ({
    getBanks: builder.query({
      query: () => `/api/admin/bank`,
      providesTags: ["Banks"],
    }),
    getSingleBank: builder.query({
      query: (data) => `/api/admin/bank/${data?.id}`,
    }),
    postBank: builder.mutation({
      query: (data) => ({
        url: `/api/admin/bank`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Banks"],
    }),
    updateBank: builder.mutation({
      query: (data) => ({
        url: `/api/admin/bank/${data?.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Banks"],
    }),
    deleteBank: builder.mutation({
      query: (data) => ({
        url: `/api/admin/bank/${data?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banks"],
    }),
  }),
});

export const {
  useGetBanksQuery,
  useGetSingleBankQuery,
  usePostBankMutation,
  useUpdateBankMutation,
  useDeleteBankMutation,
} = bankApi;
