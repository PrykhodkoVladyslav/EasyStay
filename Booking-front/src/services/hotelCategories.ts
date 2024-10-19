import { createApi } from "@reduxjs/toolkit/query/react";
// import { GetHotelPageRequest } from "interfaces/hotel";
import { HotelCategory } from "interfaces/hotelCategories";
// import { GetPageResponse } from "interfaces/hotel.ts";
import { createBaseQuery } from "utils/apiUtils.ts";
// import { createQueryString } from "utils/createQueryString.ts";

export const hotelCategoriesApi = createApi({
    reducerPath: "hotelCategoriesApi",
    baseQuery: createBaseQuery("hotelCategories"),
    tagTypes: ["HotelsCategories"],

    endpoints: (builder) => ({
        getAllHotelCategories: builder.query<HotelCategory[], void>({
            query: () => "getAll",
            providesTags: ["HotelsCategories"],
        }),

        // getPageHotelCategories: builder.query<GetPageResponse<HotelCategories>, GetHotelPageRequest>({
        //     query: (params) => {
        //         const queryString = createQueryString(params as Record<string, any>);
        //         return `getPage?${queryString}`;
        //     },
        // }),
    }),
});

export const {
    useGetAllHotelCategoriesQuery,
    // useGetPageHotelCategoriesQuery
} = hotelCategoriesApi;
