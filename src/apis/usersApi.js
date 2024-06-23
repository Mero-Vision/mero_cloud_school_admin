import { mainApi } from "./mainApi";
const usersBaseUrl = "/api/admin/user";
export const usersApi = mainApi.injectEndpoints({
  tagTypes: ["Users", "SingleUser", "UsersCompany"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({ url: usersBaseUrl, params }),
      providesTags: ["Users"],
    }),
    getUsersCompany: builder.query({
      query: () => `/api/admin/user-company-list`,
      providesTags: ["UsersCompany"],
    }),
    getSingleUser: builder.query({
      query: (data) => usersBaseUrl + `/${data?.id}`,
      providesTags: ["SingleUser"],
    }),
    assignPermission: builder.mutation({
      query: (body) => ({
        url: `/api/superadmin/role/${body?.id}/assign-permission`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["SingleUser"]),
    }),
    createCompanyUser: builder.mutation({
      query: (body) => ({
        url: "/api/create-company-user",
        method: "POST",
        body,
      }),

      invalidatesTags: (result, error) => (error ? [] : ["CompanyUsers"]),
    }),
    updateCompanyUser: builder.mutation({
      query: (body) => ({
        url: "/api/update-company-user",
        method: "POST",
        body,
      }),

      invalidatesTags: (result, error) => (error ? [] : ["CompanyUsers"]),
    }),
  }),
});

export const {
  useGetUsersCompanyQuery,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useAssignPermissionMutation,
} = usersApi;
