import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/apiUtils.ts";
import { RoomVariantsFreeRequest } from "interfaces/room/IRoom.ts";

export const roomApi = createApi({
    reducerPath: "roomApi",
    baseQuery: createBaseQuery("rooms"),
    tagTypes: ["Rooms"],

    endpoints: (build) => ({
        getRoomVariantsFreeQuantity: build.query<number, RoomVariantsFreeRequest>({
            query: ({ id, FreePeriod }) => ({
                url: `getRoomVariantsFreeQuantity?id=${id}&freePeriod.from=${FreePeriod.from}&freePeriod.to=${FreePeriod.to}`,
                method: "GET",
            }),
            providesTags: ["Rooms"],
        }),
    }),
});

export const {
    useGetRoomVariantsFreeQuantityQuery,
} = roomApi;