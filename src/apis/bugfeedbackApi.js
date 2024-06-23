import { mainApi } from "./mainApi";

const mainUrl = "/api/admin/bug";
const feedbackUrl = "/api/admin/bug-feedback";

export const bugFeedbackApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getBugs: builder.query({
      query: (params) => ({
        url: mainUrl,
        params,
      }),
      providesTags: ["bugs"],
    }),

    getSingleBug: builder.query({
      query: (data) => `${mainUrl}/${data?.id}`,
      providesTags: ["getSingleBug"],
    }),

    createBug: builder.mutation({
      query: (data) => ({
        url: mainUrl,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["bugs"]),
    }),

    deleteBug: builder.mutation({
      query: (data) => ({
        url: `${mainUrl}/${data?.id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(bugFeedbackApi.util.invalidateTags(["bugs"]));
      },
    }),

    changeBugStatus: builder.mutation({
      query: (data) => ({
        url: `${mainUrl}/${data?.id}/update-status`,
        method: "POST",
        body: data,
      }),

      // providesTags: ["changeStatus"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(bugFeedbackApi.util.invalidateTags(["bugs", "getSingleBug"]));
      },
    }),

    getFeedbacks: builder.query({
      query: (params) => ({
        url: feedbackUrl,
        params,
      }),
      providesTags: ["feedbacks"],
    }),

    createFeedback: builder.mutation({
      query: (data) => ({
        url: feedbackUrl,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["feedbacks"]),
    }),
  }),
});

export const {
  useGetBugsQuery,
  useChangeBugStatusMutation,
  useCreateBugMutation,
  useCreateFeedbackMutation,
  useDeleteBugMutation,
  useGetFeedbacksQuery,
  useGetSingleBugQuery,
} = bugFeedbackApi;
