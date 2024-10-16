import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/apiUtils.ts";
import IHotelAmenity from "interfaces/hotelAmenity/IHotelAmenity.ts";

export const hotelAmenityApi = createApi({
    reducerPath: "hotelAmenityApi",
    baseQuery: createBaseQuery("hotelAmenities"),
    tagTypes: ["HotelAmenities"],

    endpoints: (build) => ({
        getAllHotelAmenities: build.query<IHotelAmenity[], void>({
            query: () => "getAll",
            providesTags: ["HotelAmenities"],
        }),
    }),
});

export const {
    useGetAllHotelAmenitiesQuery,
} = hotelAmenityApi;