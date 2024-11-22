import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/apiUtils.ts";
import IRoomVariantCreate from "interfaces/roomVariant/IRoomVariantCreate.ts";

export const roomVariantApi = createApi({
    reducerPath: "roomVariantApi",
    baseQuery: createBaseQuery("roomVariants"),
    tagTypes: ["RoomVariants"],

    endpoints: (builder) => ({

        createRoomVariant: builder.mutation<number, IRoomVariantCreate>({
            query: (roomVariant) => ({
                url: "create",
                method: "POST",
                body: roomVariant,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ["RoomVariants"],
        }),

        deleteRoomVariant: builder.mutation({
            query: (id: number) => ({
                url: `delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["RoomVariants"],
        }),
    }),
});

export const {
    useCreateRoomVariantMutation,
    // useUpdateRoomVariantMutation,
    useDeleteRoomVariantMutation,
} = roomVariantApi;