import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from 'utils/apiUtils';
import { IFavoriteHotel } from 'interfaces/favoriteHotel/IFavoriteHotel';

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
    useIsFavoriteHotelQuery,
    useCreateFavoriteHotelMutation,
    useDeleteFavoriteHotelMutation,
} = favoriteHotelApi;