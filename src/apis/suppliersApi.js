import { mainApi } from "./mainApi";

export const suppliersApi = mainApi.injectEndpoints({
  tagTypes: ["Suppliers"],
  endpoints: (builder) => ({
    getSuppliers: builder.query({
      query: () => `/api/admin/vendor`,
      providesTags: ["Suppliers"],
    }),
    getSingleSupplier: builder.query({
      query: (data) => `/api/admin/vendor/${data?.id}`,
    }),
    postSupplier: builder.mutation({
      query: (data) => ({
        url: `/api/admin/vendor`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Suppliers"],
    }),
    updateSupplier: builder.mutation({
      query: (data) => ({
        url: `/api/admin/vendor/${data?.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Suppliers"],
    }),
    deleteSupplier: builder.mutation({
      query: (data) => ({
        url: `/api/admin/vendor/${data?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Suppliers"],
    }),
  }),
});

export const {
  useGetSuppliersQuery,
  useGetSingleSupplierQuery,
  usePostSupplierMutation,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
} = suppliersApi;
