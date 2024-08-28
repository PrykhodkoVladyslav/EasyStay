import { createApi } from "@reduxjs/toolkit/query/react";
import { CreateHotel, Hotel } from "interfaces/hotel";
// import { GetHotelPageRequest } from "interfaces/hotel";
// import { GetPageResponse } from "interfaces/hotel.ts";
import { createBaseQuery } from "utils/apiUtils.ts";
// import { createQueryString } from "utils/createQueryString.ts";

export const hotelApi = createApi({
    reducerPath: "hotelApi",
    baseQuery: createBaseQuery("hotels"),
    tagTypes: ["Hotels"],

    endpoints: (builder) => ({
        getHotel: builder.query<Hotel, string>({
            query: (id) => `getById/${id}`,
        }),

        getAllHotels: builder.query<Hotel[], void>({
            query: () => "getAll",
            providesTags: ["Hotels"],
        }),

        // getPageHotels: builder.query<GetPageResponse<Hotel>, GetHotelPageRequest>({
        //     query: (params) => {
        //         const queryString = createQueryString(params as Record<string, any>);
        //         return `getPage?${queryString}`;
        //     },
        // }),

        addHotel: builder.mutation({
            query: (hotel: CreateHotel) => {
                const hotelFormData = new FormData();
                hotelFormData.append("Name", hotel.name);
                hotelFormData.append("Description", hotel.description);
                hotelFormData.append("Area", hotel.area);
                hotelFormData.append("NumberOfRooms", hotel.numberOfRooms);
                hotelFormData.append("Address.Street", hotel.address.street);
                hotelFormData.append("Address.HouseNumber", hotel.address.houseNumber);
                hotelFormData.append("Address.Latitude", hotel.address.latitude);
                hotelFormData.append("Address.Longitude", hotel.address.longitude);
                hotelFormData.append("Address.CityId", hotel.cityId?.toString());
                hotelFormData.append("CategoryId", hotel.categoryId?.toString());

                if (hotel.photos) {
                    Array.from(hotel.photos).forEach((image) => hotelFormData.append("Photos", image));
                }

                return {
                    url: "create",
                    method: "POST",
                    body: hotelFormData,
                };
            },
            invalidatesTags: ["Hotels"],
        }),

        updateHotel: builder.mutation({
            query: (hotel: Hotel) => {
                const hotelFormData = new FormData();
                hotelFormData.append("Id", hotel.id.toString());
                hotelFormData.append("Name", hotel.name);
                hotelFormData.append("Description", hotel.description);
                hotelFormData.append("Area", hotel.area);
                hotelFormData.append("NumberOfRooms", hotel.numberOfRooms);
                hotelFormData.append("Address.Street", hotel.address.street);
                hotelFormData.append("Address.HouseNumber", hotel.address.houseNumber);
                hotelFormData.append("Address.Latitude", hotel.address.latitude);
                hotelFormData.append("Address.Longitude", hotel.address.longitude);
                hotelFormData.append("Address.CityId", hotel.cityId?.toString());
                hotelFormData.append("CategoryId", hotel.categoryId?.toString());

                if (hotel.photos) {
                    Array.from(hotel.photos).forEach((image) => hotelFormData.append("Photos", image));
                }

                return {
                    url: `update`,
                    method: "PUT",
                    body: hotelFormData,
                };
            },
            invalidatesTags: ["Hotels"],
        }),

        deleteHotel: builder.mutation({
            query: (id: string) => ({
                url: `delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Hotels"],
        }),
    }),
});

export const {
    useAddHotelMutation,
    useGetAllHotelsQuery,
    useUpdateHotelMutation,
    useDeleteHotelMutation,
    useGetHotelQuery,
    useGetPageHotelsQuery,
} = hotelApi;
