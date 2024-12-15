import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/apiUtils.ts";
import IRoomVariantCreate from "interfaces/roomVariant/IRoomVariantCreate.ts";
import { IRoomVariantUpdate } from "interfaces/roomVariant/IRoomVariantUpdate.ts";
// import IRoomVariant from "interfaces/roomVariant/IRoomVariant.ts";

export const roomVariantApi = createApi({
    reducerPath: "roomVariantApi",
    baseQuery: createBaseQuery("roomVariants"),
    tagTypes: ["RoomVariants"],

    endpoints: (builder) => ({

        // getRoomVariant: builder.query<IRoomVariant, number>({
        //     query: (id) => `getById/${id}`,
        //     providesTags: ["RoomVariants"],
        // }),

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

        updateRoomVariant: builder.mutation({
            query: (roomVariant: IRoomVariantUpdate) => ({
                url: "update",
                method: "PUT",
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
    useUpdateRoomVariantMutation,
    useDeleteRoomVariantMutation,
} = roomVariantApi;