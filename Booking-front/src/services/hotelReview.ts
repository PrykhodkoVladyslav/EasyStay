import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/apiUtils.ts";
import IPage from "interfaces/page/IPage.ts";
import IHotelReviewsPageQuery, { toQueryFromIHotelReviewsPageQuery } from "interfaces/hotelReview/IHotelReviewsPageQuery.ts";
import { IHotelReview } from "interfaces/hotelReview/IHotelReview.ts";

export const hotelReviewApi = createApi({
    reducerPath: "hotelReviewApi",
    baseQuery: createBaseQuery("hotelReviews"),
    tagTypes: ["HotelReviews"],

    endpoints: (builder) => ({
        getHotelReviewsPage: builder.query<IPage<IHotelReview>, IHotelReviewsPageQuery | undefined>({
            query: (query) => {
                const baseQuery = "GetPage";

                if (!query)
                    return baseQuery;

                return `${baseQuery}?${toQueryFromIHotelReviewsPageQuery(query)}`;
            },
            providesTags: ["HotelReviews"],
        }),
    }),
});

export const {
    useGetHotelReviewsPageQuery,
} = hotelReviewApi;
