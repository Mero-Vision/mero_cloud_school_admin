import { mainApi } from "./mainApi";

export const roleApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: (params) => ({
        url: `/api/superadmin/role`,
      }),

      providesTags: ["getroles"],
    }),

    createCustomRole: builder.mutation({
      query: (body) => ({
        url: `/api/superadmin/role`,
        method: "POST",
        body,
      }),

      invalidatesTags: ["getroles"],
    }),

    getSingleRoles: builder.query({
      query: (params) => ({
        url: `/api/superadmin/role/${params?.id}`,
        params,
      }),
    }),

    updateRole: builder.mutation({
      query: (body) => ({
        url: `/api/superadmin/role/${body?.id}`,
        method: "POST",
        body: {
          ...body,
          _method: "PATCH",
        },
      }),

      invalidatesTags: ["getroles"],
    }),

    deleteRole: builder.mutation({
      query: (data) => ({
        url: `/api/superadmin/role/${data?.id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["getroles"],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useCreateCustomRoleMutation,
  useGetSingleRolesQuery,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = roleApi;
