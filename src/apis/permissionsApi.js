import { mainApi } from "./mainApi";
const permissionBaseUrl = "/api/admin/permission";
export const permissionsApi = mainApi.injectEndpoints({
  tagTypes: ["Permission"],
  endpoints: (builder) => ({
    getPermissions: builder.query({
      query: (data) => ({ url: permissionBaseUrl, params: data }),
      providesTags: ["Permission"],
    }),

    addPermissions: builder.mutation({
      query: (body) => ({
        url: permissionBaseUrl,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Permission"]),
    }),

    deletePermissions: builder.mutation({
      query: (data) => ({
        url: permissionBaseUrl + `/${data?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Permission"]),
    }),
  }),
});

export const {
  useGetPermissionsQuery,
  useAddPermissionsMutation,
  useDeletePermissionsMutation,
} = permissionsApi;
