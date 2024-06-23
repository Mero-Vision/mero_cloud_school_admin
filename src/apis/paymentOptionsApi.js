import { mainApi } from "./mainApi";

export const paymentOptionsApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentOption: builder.mutation({
      query: (body) => ({
        url: `api/superadmin/payment-option`,
        method: "POST",
        body,
      }),

      invalidatesTags: ["paymentoptions"],
    }),

    getPaymentOptions: builder.query({
      query: (params) => ({
        url: `/api/superadmin/payment-option`,
        params,
      }),

      providesTags: ["paymentoptions"],
    }),

    updatePaymentOptions: builder.mutation({
      query: ({ body, id }) => {
        return {
          url: `/api/superadmin/payment-option/${id}`,
          method: "POST",
          body,
        };
      },

      invalidatesTags: (result, error) => !error && ["paymentoptions"],
    }),

    deletePaymentOptions: builder.mutation({
      query: (body) => ({
        url: `/api/superadmin/payment-option/${body?.id}`,
        method: "DELETE",
        body,
      }),

      invalidatesTags: ["paymentoptions"],
    }),

    updatePaymentOptionStatus: builder.mutation({
      query: (body) => ({
        url: `/api/superadmin/payment-option/${body?.id}/update-status`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error) => !error && ["paymentoptions"],
    }),
  }),
});

export const {
  useCreatePaymentOptionMutation,
  useGetPaymentOptionsQuery,
  useUpdatePaymentOptionsMutation,
  useDeletePaymentOptionsMutation,
  useUpdatePaymentOptionStatusMutation,
} = paymentOptionsApi;
