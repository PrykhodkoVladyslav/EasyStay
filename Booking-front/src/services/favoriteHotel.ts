import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from 'utils/apiUtils';
import { IFavoriteHotel } from 'interfaces/favoriteHotel/IFavoriteHotel';
import { IHotel } from "interfaces/hotel/IHotel.ts";
import IPage from "interfaces/page/IPage.ts";
import IHotelsPageQuery, { toQueryFromIHotelsPageQuery } from "interfaces/hotel/IHotelsPageQuery.ts";

export const favoriteHotelApi = createApi({
    reducerPath: 'favoriteHotelApi',
    baseQuery: createBaseQuery('favoriteHotels'),
    tagTypes: ['FavoriteHotels'],

    endpoints: (builder) => ({
        isFavoriteHotel: builder.query<boolean, { hotelId: number }>({
            query: (hotelId) => ({
                url: `isFavoriteHotel/${hotelId}`,
                method: 'GET',
            }),
            providesTags: ['FavoriteHotels'],
        }),

        createFavoriteHotel: builder.mutation<void, IFavoriteHotel>({
            query: (favoriteHotel) => ({
                url: "create",
                method: 'POST',
                body: favoriteHotel,
            }),
            invalidatesTags: ['FavoriteHotels'],
        }),

        deleteFavoriteHotel: builder.mutation({
            query: (id: number) => ({
                url: `delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['FavoriteHotels'],
        }),
    }),
});

export const {
    useGetFavoriteHotelsPageQuery,
    useIsFavoriteHotelQuery,
    useCreateFavoriteHotelMutation,
    useDeleteFavoriteHotelMutation,
} = favoriteHotelApi;