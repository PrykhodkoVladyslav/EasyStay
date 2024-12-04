import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/apiUtils.ts";
import IPage from "interfaces/page/IPage.ts";
import IRealtorReviewsPageQuery, {
    toQueryFromIRealtorReviewsPageQuery,
} from "interfaces/realtorReview/IRealtorReviewsPageQuery.ts";
import { IRealtorReview } from "interfaces/realtorReview/IRealtorReview.ts";
import ICreateRealtorReview from "interfaces/realtorReview/ICreateRealtorReview.ts";

export const realtorReviewApi = createApi({
    reducerPath: "realtorReviewApi",
    baseQuery: createBaseQuery("realtorReviews"),
    tagTypes: ["RealtorReviews"],

    endpoints: (builder) => ({
        getRealtorReviewsPage: builder.query<IPage<IRealtorReview>, IRealtorReviewsPageQuery | undefined>({
            query: (query) => {
                const baseQuery = "GetPage";

                if (!query)
                    return baseQuery;

                return `${baseQuery}?${toQueryFromIRealtorReviewsPageQuery(query)}`;
            },
            providesTags: ["RealtorReviews"],
        }),

        createRealtorReview: builder.mutation<number, ICreateRealtorReview>({
            query: (args) => ({
                url: "create",
                method: "POST",
                body: args,
            }),
            invalidatesTags: ["RealtorReviews"],
        }),
    }),
});

export const {
    useGetRealtorReviewsPageQuery,
    useCreateRealtorReviewMutation,
} = realtorReviewApi;
