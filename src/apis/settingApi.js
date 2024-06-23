import { mainApi } from "./mainApi";

const fiscalYearQueryUrl = "/api/admin/fiscal-year";

export const settingsApi = mainApi.injectEndpoints({
  tagTypes: ["FiscalYear"],
  endpoints: (builder) => ({
    getFiscalYear: builder.query({
      query: () => `${fiscalYearQueryUrl}`,
      providesTags: ["FiscalYear"],
    }),

    createFiscalYear: builder.mutation({
      query: (body) => ({
        url: fiscalYearQueryUrl,
        method: "POST",
        body,
      }),
      invalidatesTags: ["FiscalYear"],
    }),

    updateFiscalYear: builder.mutation({
      query: (body) => ({
        url: fiscalYearQueryUrl + `/${body?.id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["FiscalYear"],
    }),
  }),
});

export const {
  useCreateFiscalYearMutation,
  useGetFiscalYearQuery,
  useUpdateFiscalYearMutation,
} = settingsApi;
