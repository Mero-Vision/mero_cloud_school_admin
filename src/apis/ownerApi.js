import { mainApi } from "./mainApi";

export const ownerApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getOwner: builder.query({
      query: (params) => ({
        url: `/api/superadmin/company/${params?.company_id}/owner/invitations`,
        params,
      }),

      providesTags: ["getOwner"],
    }),

    unassignOwner: builder.mutation({
      query: (data) => ({
        url: `/api/superadmin/company/${data?.company_id}/unassign-owner`,
        method: "POST",
        body: {
          user_id: data?.user_id,
        },
      }),

      invalidatesTags: ["getOwner"],
    }),
  }),
});

export const { useGetOwnerQuery, useUnassignOwnerMutation } = ownerApi;
