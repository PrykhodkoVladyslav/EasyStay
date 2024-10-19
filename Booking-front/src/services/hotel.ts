import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/apiUtils.ts";
import { IHotel } from "interfaces/hotel/IHotel.ts";
import { ISetArchiveStatusRequest } from "interfaces/hotel/ISetArchiveStatusRequest.ts";
import IHotelDetails from "interfaces/hotel/IHotelDetails.ts";
import IPage from "interfaces/page/IPage.ts";
import IHotelsPageQuery from "interfaces/hotel/IHotelsPageQuery.ts";
import queryString from "query-string";

export const hotelApi = createApi({
    reducerPath: "hotelApi",
    baseQuery: createBaseQuery("hotels"),
    tagTypes: ["Hotels"],

    endpoints: (builder) => ({
        getAllHotels: builder.query<IHotel[], void>({
            query: () => "getAll",
            providesTags: ["Hotels"],
        }),

        getHotelsPage: builder.query<IPage<IHotel>, IHotelsPageQuery>({
            query: (query) => `GetPage?${queryString.stringify(query)}`,
            providesTags: ["Hotels"],
        }),

        getHotel: builder.query<IHotelDetails[], number>({
            query: (id) => `getById/${id}`,
        }),

        getRealtorHotelsPage: builder.query<IHotel[], { RealtorId?: string }>({
            query: ({ RealtorId }) => `GetPage?${RealtorId ? `RealtorId=${RealtorId}` : ""}`,
            providesTags: ["Hotels"],
        }),

        // getPageHotels: builder.query<GetPageResponse<Hotel>, GetHotelPageRequest>({
        //     query: (params) => {
        //         const queryString = createQueryString(params as Record<string, any>);
        //         return `getPage?${queryString}`;
        //     },
        // }),

        // createHotel: builder.mutation({
        //     query: (hotel) => {
        //         const hotelFormData = new FormData();
        //         hotelFormData.append("Name", hotel.name);
        //         hotelFormData.append("Description", hotel.description);
        //         hotelFormData.append("Area", hotel.area);
        //         hotelFormData.append("NumberOfRooms", hotel.numberOfRooms);
        //         hotelFormData.append("IsArchived", hotel.isArchived);
        //         hotelFormData.append("Address.Street", hotel.address.street);
        //         hotelFormData.append("Address.HouseNumber", hotel.address.houseNumber);
        //         hotelFormData.append("Address.Latitude", hotel.address.latitude);
        //         hotelFormData.append("Address.Longitude", hotel.address.longitude);
        //         hotelFormData.append("Address.CityId", hotel.cityId?.toString());
        //         hotelFormData.append("CategoryId", hotel.categoryId?.toString());
        //         if (hotel.photos) {
        //             Array.from(hotel.photos).forEach((image) => hotelFormData.append("Photos", image as File));
        //         }
        //
        //         return {
        //             url: "create",
        //             method: "POST",
        //             body: hotelFormData,
        //         };
        //     },
        //     invalidatesTags: ["Hotels"],
        // }),
        //
        // updateHotel: builder.mutation({
        //     query: (hotel: IHotel) => {
        //         const hotelFormData = new FormData();
        //         hotelFormData.append("Id", hotel.id.toString());
        //         hotelFormData.append("Name", hotel.name);
        //         hotelFormData.append("Description", hotel.description);
        //         hotelFormData.append("Area", hotel.area.toString());
        //         hotelFormData.append("NumberOfRooms", hotel.numberOfRooms.toString());
        //         hotelFormData.append("IsArchived", hotel.isArchived.toString());
        //         hotelFormData.append("Address.Street", hotel.address.street);
        //         hotelFormData.append("Address.HouseNumber", hotel.address.houseNumber);
        //         hotelFormData.append("Address.Latitude", hotel.address.latitude.toString());
        //         hotelFormData.append("Address.Longitude", hotel.address.longitude.toString());
        //         hotelFormData.append("Address.CityId", hotel.address.city.id.toString());
        //         hotelFormData.append("CategoryId", hotel.category.id.toString());
        //         if (hotel.photos) {
        //             Array.from(hotel.photos).forEach((image) => hotelFormData.append("Photos", image as File));
        //         }
        //
        //         return {
        //             url: "update",
        //             method: "PUT",
        //             body: hotelFormData,
        //         };
        //     },
        //     invalidatesTags: ["Hotels"],
        // }),

        // getPageHotels: builder.query<GetPageResponse<Hotel>, GetHotelPageRequest>({
        //     query: (params) => {
        //         const queryString = createQueryString(params as Record<string, any>);
        //         return `getPage?${queryString}`;
        //     },
        // }),

        setArchiveStatusHotel: builder.mutation<void, ISetArchiveStatusRequest>({
            query: ({ id, isArchived }) => ({
                url: "SetArchiveStatus",
                method: "PATCH",
                body: {
                    id,
                    IsArchived: isArchived,
                },
            }),
            invalidatesTags: ["Hotels"],
        }),

        getMaxHotelPrice: builder.query<number, void>({
            query: () => "GetMaxPrice",
            providesTags: ["Hotels"],
        }),
    }),
});

export const {
    useGetAllHotelsQuery,
    useGetHotelsPageQuery,
    useGetHotelQuery,
    useGetRealtorHotelsPageQuery,
    // useCreateHotelMutation,
    // useUpdateHotelMutation,
    useDeleteHotelMutation,
    useSetArchiveStatusHotelMutation,
    useGetMaxHotelPriceQuery,
} = hotelApi;
