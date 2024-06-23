import { mainApi } from "./mainApi";

const companyBaseUrl = "/api/superadmin/institutions";

export const companyApi = mainApi.injectEndpoints({
   tagTypes: ["Company", "SingleCompany", "CompanyUsers"],
   endpoints: (builder) => ({
      getAllCompany: builder.query({
         query: (params) => ({ url: companyBaseUrl, params }),
         providesTags: ["Company"],
      }),

      getSingleCompany: builder.query({
         query: (data) => companyBaseUrl + `/${data?.id}`,
         providesTags: ["SingleCompany"],
      }),

      createCompany: builder.mutation({
         query: (body) => ({
            url: companyBaseUrl,
            method: "POST",
            body,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Company"],
      }),

      updateCompany: builder.mutation({
         query: ({ id, data }) => ({
            url: companyBaseUrl + `/${id}`,
            method: "POST",
            body: data,
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(companyApi.util.invalidateTags(["Company"]));
         },
      }),

      companySubscribePackage: builder.mutation({
         query: (data) => ({
            url: `/api/superadmin/company/${data?.company_id}/subscribe-package`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["SingleCompany"],
      }),

      companyModifyPackage: builder.mutation({
         query: (data) => ({
            url: `/api/superadmin/company/${data?.company_id}/modify-package`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["SingleCompany"],
      }),

      deleteCompany: builder.mutation({
         query: (id) => ({
            url: companyBaseUrl + `/${id}`,
            method: "DELETE",
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(companyApi.util.invalidateTags(["Company"]));
         },
      }),

      assignCompanyAdmin: builder.mutation({
         query: (body) => ({
            url: `/api/superadmin/company/${body?.company_id}/assign-update-owner`,
            method: "POST",
            body,
         }),

         // async onQueryStarted(_, { dispatch, queryFulfilled }) {
         //   await queryFulfilled;
         //   dispatch(companyApi.util.invalidateTags(["Company", "CompanyUsers"]));
         // },

         // invalidatesTags: ["getOwner"],
      }),
      createCompanyUser: builder.mutation({
         query: (body) => ({
            url: "/api/admin/create-company-user",
            method: "POST",
            body,
         }),

         invalidatesTags: (result, error) =>
            error ? [] : ["CompanyUsers"],
      }),
      updateCompanyUser: builder.mutation({
         query: (body) => ({
            url: "/api/admin/update-company-user",
            method: "POST",
            body,
         }),

         invalidatesTags: (result, error) =>
            error ? [] : ["CompanyUsers"],
      }),

      getCompanyUser: builder.query({
         query: (data) => ({
            url: `/api/admin/company-user/${data?.id}`,
         }),
         providesTags: ["CompanyUsers"],
      }),
      changeCompanyStatus: builder.mutation({
         query: (data) => ({
            url: `/api/superadmin/company/${data?.id}/update-status`,
            method: "POST",
            body: {
               ...data,
               _method: "PATCH",
            },
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(companyApi.util.invalidateTags(["Company"]));
         },
      }),
   }),
});

export const {
   useGetAllCompanyQuery,
   useCreateCompanyMutation,
   useGetSingleCompanyQuery,
   useUpdateCompanyMutation,
   useDeleteCompanyMutation,
   useUpdateCompanyUserMutation,
   useCreateCompanyUserMutation,
   useGetCompanyUserQuery,
   useAssignCompanyAdminMutation,
   useCompanySubscribePackageMutation,
   useCompanyModifyPackageMutation,
   useChangeCompanyStatusMutation,
} = companyApi;
