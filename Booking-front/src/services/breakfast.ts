import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/apiUtils.ts";
import {
    IHotelAmenity,
} from "interfaces/hotelAmenity";
import {IBreakfast} from "interfaces/breakfast";

export const breakfastApi = createApi({
    reducerPath: "breakfastsApi",
    baseQuery: createBaseQuery("breakfasts"),
    tagTypes: ["Breakfasts"],

    endpoints: (builder) => ({
        getAllBreakfasts: builder.query<IBreakfast[], void>({
            query: () => "GetAll",
            providesTags: ["Breakfasts"],
        }),
    })
})

export const {
    useGetAllBreakfastsQuery,
} = breakfastApi;
