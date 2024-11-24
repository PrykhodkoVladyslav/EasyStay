import { createApi } from "@reduxjs/toolkit/query/react";
import { HotelCategory } from "interfaces/hotelCategories";
import { createBaseQuery } from "utils/apiUtils.ts";

export const hotelCategoriesApi = createApi({
    reducerPath: "hotelCategoriesApi",
    baseQuery: createBaseQuery("hotelCategories"),
    tagTypes: ["HotelsCategories"],

    endpoints: (builder) => ({
        getAllHotelCategories: builder.query<HotelCategory[], void>({
            query: () => "getAll",
            providesTags: ["HotelsCategories"],
        }),
    }),
});

export const {
    useGetAllHotelCategoriesQuery,
} = hotelCategoriesApi;
