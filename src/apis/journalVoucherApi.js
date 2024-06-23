import { mainApi } from "./mainApi";

export const journalVoucherApi = mainApi.injectEndpoints({
  tagTypes: ["Voucher"],
  endpoints: (builder) => ({
    getJournalVoucher: builder.query({
      query: () => `/api/admin/journal-voucher`,
      providesTags: [`Voucher`],
    }),
    getSingleJournalVoucher: builder.query({
      query: (data) => `/api/admin/journal-voucher/${data?.id}`,
    }),
    postJournalVoucher: builder.mutation({
      query: (data) => ({
        url: `/api/admin/journal-voucher`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Voucher"],
    }),
    updateJournalVoucher: builder.mutation({
      query: (data) => ({
        url: `/api/admin/journal-voucher/${data?.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Voucher"],
    }),
    deleteJournalVoucher: builder.mutation({
      query: (data) => ({
        url: `/api/admin/journal-voucher/${data?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Voucher"],
    }),
  }),
});

export const {
  useGetJournalVoucherQuery,
  useGetSingleJournalVoucherQuery,
  usePostJournalVoucherMutation,
  useUpdateJournalVoucherMutation,
  useDeleteJournalVoucherMutation,
} = journalVoucherApi;
