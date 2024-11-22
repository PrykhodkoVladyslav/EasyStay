import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/apiUtils.ts";
import IRoomType from "interfaces/roomType/IRoomType.ts";

export const roomTypeApi = createApi({
    reducerPath: "roomTypeApi",
    baseQuery: createBaseQuery("roomTypes"),
    tagTypes: ["RoomTypes"],

    endpoints: (build) => ({
        getAllRoomTypes: build.query<IRoomType[], void>({
            query: () => "getAll",
            providesTags: ["RoomTypes"],
        }),
    }),
});

export const {
    useGetAllRoomTypesQuery,
} = roomTypeApi;