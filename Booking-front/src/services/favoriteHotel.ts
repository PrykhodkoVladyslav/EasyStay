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
        getAllFavoriteHotels: builder.query<IHotel[], void>({
            query: () => "getAll",
            providesTags: ['FavoriteHotels'],
        }),

        getFavoriteHotelsPage: builder.query<IPage<IHotel>, IHotelsPageQuery | undefined>({
            query: (query) => {
                const baseQuery = "GetPage";

                if (!query)
                    return baseQuery;

                return `${baseQuery}?${toQueryFromIHotelsPageQuery(query)}`;
            },
            providesTags: ["FavoriteHotels"],
        }),

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
    useGetAllFavoriteHotelsQuery,
    useGetFavoriteHotelsPageQuery,
    useIsFavoriteHotelQuery,
    useCreateFavoriteHotelMutation,
    useDeleteFavoriteHotelMutation,
} = favoriteHotelApi;