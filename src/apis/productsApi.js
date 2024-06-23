import { mainApi } from "./mainApi";

export const productsApi = mainApi.injectEndpoints({
  tagTypes: ["Customers"],
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => `/api/admin/customer`,
      providesTags: ["Customers"],
    }),
    getSingleCustomer: builder.query({
      query: (data) => `/api/admin/customer/${data?.id}`,
    }),
    postCustomer: builder.mutation({
      query: (data) => ({
        url: `/api/admin/customer`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Customers"],
    }),
    updateCustomer: builder.mutation({
      query: (data) => ({
        url: `/api/admin/customer/${data?.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Customers"],
    }),
    deleteCustomer: builder.mutation({
      query: (data) => ({
        url: `/api/admin/customer/${data?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customers"],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetSingleCustomerQuery,
  usePostCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = productsApi;
