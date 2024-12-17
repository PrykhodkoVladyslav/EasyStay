import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/apiUtils.ts";
import IPage from "interfaces/page/IPage.ts";
import IHotelReviewsPageQuery, {
    toQueryFromIHotelReviewsPageQuery,
} from "interfaces/hotelReview/IHotelReviewsPageQuery.ts";
import { IHotelReview } from "interfaces/hotelReview/IHotelReview.ts";
import { IHotelReviewCreate } from "interfaces/hotelReview/IHotelReviewCreate.ts";

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

        createHotelReview: builder.mutation<number, IHotelReviewCreate>({
            query: (hotelReview) => {
                const hotelReviewFormData = new FormData();

                hotelReviewFormData.append("Description", hotelReview.description);
                if(hotelReview.score != undefined)
                    hotelReviewFormData.append("Score", String(hotelReview.score));
                hotelReviewFormData.append("BookingId", String(hotelReview.bookingId));

                return {
                    url: "create",
                    method: "POST",
                    body: hotelReviewFormData,
                };
            },
            invalidatesTags: ["HotelReviews"],
        }),
    }),
});

export const {
    useGetHotelReviewsPageQuery,
    useCreateHotelReviewMutation,
} = hotelReviewApi;
