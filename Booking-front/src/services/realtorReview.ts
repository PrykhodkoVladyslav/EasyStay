import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/apiUtils.ts";
import IPage from "interfaces/page/IPage.ts";
import IRealtorReviewsPageQuery, { toQueryFromIRealtorReviewsPageQuery } from "interfaces/realtorReview/IRealtorReviewsPageQuery.ts";
import { IRealtorReview } from "interfaces/realtorReview/IRealtorReview.ts";

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
    }),
});

export const {
    useGetRealtorReviewsPageQuery,
} = realtorReviewApi;
