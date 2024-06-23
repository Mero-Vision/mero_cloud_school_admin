import { mainApi } from "./mainApi";

export const packageApi = mainApi.injectEndpoints({
  tagTypes: ["Package", "SinglePackage"],
  endpoints: (builder) => ({
    getPackage: builder.query({
      query: (params) => ({ url: `/api/superadmin/package`, params }),
      providesTags: ["Package"],
    }),
    getSinglePackage: builder.query({
      query: (data) => `/api/superadmin/package/${data?.id}`,
      providesTags: ["SinglePackage"],
      keepUnusedDataFor: 1,
    }),
    postPackage: builder.mutation({
      query: (data) => ({
        url: `/api/superadmin/package`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Package"]),
    }),
    updatePackage: builder.mutation({
      query: (data) => ({
        url: `/api/superadmin/package/${data?.id}`,
        method: "POST",
        body: { ...data, _method: "PATCH" },
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Package", "SinglePackage"],
    }),
    deletePackage: builder.mutation({
      query: (data) => ({
        url: `/api/superadmin/package/${data?.id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(packageApi.util.invalidateTags(["Package"]));
      },
    }),
  }),
});

export const {
  useGetPackageQuery,
  useGetSinglePackageQuery,
  usePostPackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} = packageApi;
