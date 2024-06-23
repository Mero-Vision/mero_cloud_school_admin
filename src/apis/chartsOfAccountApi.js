import { mainApi } from "./mainApi";

export const chartsOfAccountsApi = mainApi.injectEndpoints({
  tagTypes: ["Charts"],
  endpoints: (builder) => ({
    getAccountHead: builder.query({
      query: (params) => ({
        url: `/api/admin/account-head`,
        params: {
          ...params,
          status: params?.status ?? "approved",
        },
      }),
      providesTags: ["Charts"],
    }),
    getSingleAccountHead: builder.query({
      query: (data) => `/api/admin/account-head/${data?.id}`,
    }),
    getAccountHeadTree: builder.query({
      query: (params) => ({
        url: `api/account-head-tree`,
        params,
      }),
      providesTags: ["Charts"],
    }),
    getAccountHeadChild: builder.query({
      query: (params) => ({
        url: `api/account-head-without-sub`,
        params,
      }),
      providesTags: ["Charts"],
    }),
    postAccountHead: builder.mutation({
      query: (data) => ({
        url: `/api/admin/account-head`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Charts"],
    }),
    updateAccountHead: builder.mutation({
      query: (data) => ({
        url: `/api/admin/account-head/${data?.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Charts"],
    }),
    deleteAccountHead: builder.mutation({
      query: (data) => ({
        url: `/api/admin/account-head/${data?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Charts"],
    }),
  }),
});

export const {
  useGetAccountHeadQuery,
  useGetSingleAccountHeadQuery,
  useGetAccountHeadTreeQuery,
  useGetAccountHeadChildQuery,
  usePostAccountHeadMutation,
  useUpdateAccountHeadMutation,
  useDeleteAccountHeadMutation,
} = chartsOfAccountsApi;
