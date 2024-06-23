import { mainApi } from "./mainApi";

export const employeeApi = mainApi.injectEndpoints({
  tagTypes: ["Employees"],
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => `/api/admin/employee`,
      providesTags: ["Employees"],
    }),
    getSingleEmployee: builder.query({
      query: (data) => `/api/admin/employee/${data?.id}`,
    }),
    postEmployee: builder.mutation({
      query: (data) => ({
        url: `/api/admin/employee`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Employees"],
    }),
    updateEmployee: builder.mutation({
      query: (data) => ({
        url: `/api/admin/employee/${data?.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Employees"],
    }),
    deleteEmployee: builder.mutation({
      query: (data) => ({
        url: `/api/admin/employee/${data?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employees"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetSingleEmployeeQuery,
  usePostEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
