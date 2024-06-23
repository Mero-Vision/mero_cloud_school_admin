import { mainApi } from "./mainApi";

const accountingFirmQueryUrl = "/api/admin/accounting-firm";

export const accountingFirmApi = mainApi.injectEndpoints({
  tagTypes: ["AccountingFirm", "SingleFirm", "FirmUsers"],
  endpoints: (builder) => ({
    getAccountingFirm: builder.query({
      query: (params) => ({ url: accountingFirmQueryUrl, params }),
      providesTags: ["AccountingFirm"],
    }),

    createAccountingFirm: builder.mutation({
      query: (body) => ({
        url: accountingFirmQueryUrl,
        method: "POST",
        body,
      }),
      invalidatesTags: ["AccountingFirm"],
    }),

    deleteAccountingFirm: builder.mutation({
      query: (body) => ({
        url: accountingFirmQueryUrl + `/${body?.id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(accountingFirmApi.util.invalidateTags(["AccountingFirm"]));
      },
    }),

    updateAccountingFirm: builder.mutation({
      query: (body) => ({
        url: accountingFirmQueryUrl + `/${body?.id}`,
        method: "POST",
        body: body?.formData,
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(accountingFirmApi.util.invalidateTags(["AccountingFirm"]));
      },
    }),

    getSingleAccountingFirm: builder.query({
      query: (body) => ({
        url: accountingFirmQueryUrl + `/${body?.id}`,
      }),
      providesTags: ["SingleFirm"],
    }),
    createFirmUser: builder.mutation({
      query: (body) => ({
        url: "/api/admin/create-accounting-firm-user",
        method: "POST",
        body,
      }),

      invalidatesTags: (result, error) => (error ? [] : ["FirmUsers"]),
    }),
    updateFirmUser: builder.mutation({
      query: (body) => ({
        url: "/api/admin/update-accounting-firm-user",
        method: "POST",
        body,
      }),

      invalidatesTags: (result, error) => (error ? [] : ["FirmUsers"]),
    }),
    removeFirmUser: builder.mutation({
      query: (body) => ({
        url: "/api/admin/remove-accounting-firm-user",
        method: "POST",
        body,
      }),

      invalidatesTags: (result, error) => (error ? [] : ["FirmUsers"]),
    }),

    getFirmUser: builder.query({
      query: (data) => ({
        url: `/api/admin/accounting-firm-user/${data?.id}`,
      }),
      providesTags: ["FirmUsers"],
    }),
    assignFirmAdmin: builder.mutation({
      query: (body) => ({
        url: "/api/admin/accounting-firm-assign-update-admin",
        method: "POST",
        body,
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(accountingFirmApi.util.invalidateTags(["AccountingFirm"]));
      },
    }),
    changeFirmStatus: builder.mutation({
      query: (data) => ({
        url: `/api/admin/accounting-firm/${data?.id}/status`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(accountingFirmApi.util.invalidateTags(["AccountingFirm"]));
      },
    }),
  }),
});

export const {
  useGetAccountingFirmQuery,
  useCreateAccountingFirmMutation,
  useDeleteAccountingFirmMutation,
  useUpdateAccountingFirmMutation,
  useGetSingleAccountingFirmQuery,
  useUpdateFirmUserMutation,
  useCreateFirmUserMutation,
  useRemoveFirmUserMutation,
  useGetFirmUserQuery,
  useAssignFirmAdminMutation,
  useChangeFirmStatusMutation,
} = accountingFirmApi;
