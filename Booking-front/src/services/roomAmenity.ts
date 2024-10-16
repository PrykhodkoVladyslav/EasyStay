import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/apiUtils.ts";
import IRoomAmenity from "interfaces/roomAmenity/IRoomAmenity.ts";

export const roomAmenityApi = createApi({
    reducerPath: "roomAmenityApi",
    baseQuery: createBaseQuery("roomAmenities"),
    tagTypes: ["RoomAmenities"],

    endpoints: (build) => ({
        getAllRoomAmenities: build.query<IRoomAmenity[], void>({
            query: () => "getAll",
            providesTags: ["RoomAmenities"],
        }),
    }),
});

export const {
    useGetAllRoomAmenitiesQuery,
} = roomAmenityApi;