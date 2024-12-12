import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/apiUtils";

export const favoriteHotelApi = createApi({
    reducerPath: "favoriteHotelApi",
    baseQuery: createBaseQuery("favoriteHotels"),
    tagTypes: ["FavoriteHotels"],

    endpoints: (builder) => ({
        isFavoriteHotel: builder.query<boolean, number>({
            query: (hotelId) => ({
                url: `isFavoriteHotel/${hotelId}`,
                method: "GET",
            }),
            providesTags: ["FavoriteHotels"],
        }),

        createFavoriteHotel: builder.mutation<void, number>({
            query: (hotelId) => ({
                url: "create",
                method: "POST",
                body: { hotelId },
            }),
            invalidatesTags: ["FavoriteHotels"],
        }),

        deleteFavoriteHotel: builder.mutation({
            query: (id: number) => ({
                url: `delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["FavoriteHotels"],
        }),
    }),
});

export const {
    useIsFavoriteHotelQuery,
    useCreateFavoriteHotelMutation,
    useDeleteFavoriteHotelMutation,
} = favoriteHotelApi;