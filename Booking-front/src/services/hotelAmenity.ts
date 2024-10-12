import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/apiUtils.ts";
import {
    IHotelAmenity,
} from "interfaces/hotelAmenity";

export const hotelAmenityApi = createApi({
    reducerPath: "hotelAmenitiesApi",
    baseQuery: createBaseQuery("hotelAmenities"),
    tagTypes: ["HotelAmenities"],

    endpoints: (builder) => ({
        getAllHotelAmenities: builder.query<IHotelAmenity[], void>({
            query: () => "GetAll",
            providesTags: ["HotelAmenities"],
        }),
    }),
});

export const {
    useGetAllHotelAmenitiesQuery,
} = hotelAmenityApi;
