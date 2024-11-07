import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/apiUtils.ts";
import { IHotel } from "interfaces/hotel/IHotel.ts";
import { IHotelCreate } from "interfaces/hotel/IHotelCreate.ts";
import { ISetArchiveStatusRequest } from "interfaces/hotel/ISetArchiveStatusRequest.ts";
import IHotelDetails from "interfaces/hotel/IHotelDetails.ts";
import IPage from "interfaces/page/IPage.ts";
import IHotelsPageQuery, { toQueryFromIHotelsPageQuery } from "interfaces/hotel/IHotelsPageQuery.ts";

export const hotelApi = createApi({
    reducerPath: "hotelApi",
    baseQuery: createBaseQuery("hotels"),
    tagTypes: ["Hotels"],

    endpoints: (builder) => ({
        getAllHotels: builder.query<IHotel[], void>({
            query: () => "getAll",
            providesTags: ["Hotels"],
        }),

        getHotelsPage: builder.query<IPage<IHotel>, IHotelsPageQuery | undefined>({
            query: (query) => {
                const baseQuery = "GetPage";

                if (!query)
                    return baseQuery;

                return `${baseQuery}?${toQueryFromIHotelsPageQuery(query)}`;
            },
            providesTags: ["Hotels"],
        }),

        getHotel: builder.query<IHotelDetails, number>({
            query: (id) => `getById/${id}`,
            providesTags: ["Hotels"],
        }),

        // getRealtorHotelsPage: builder.query<IHotel[], { RealtorId?: string }>({
        //     query: ({ RealtorId }) => `GetPage?${RealtorId ? `RealtorId=${RealtorId}` : ""}`,
        //     providesTags: ["Hotels"],
        // }),

        createHotel: builder.mutation<number, IHotelCreate>({
            query: (hotel) => {
                const hotelFormData = new FormData();

                hotelFormData.append("Name", hotel.name);
                hotelFormData.append("Description", hotel.description);
                hotelFormData.append("ArrivalTimeUtcFrom", hotel.arrivalTimeUtcFrom);
                hotelFormData.append("ArrivalTimeUtcTo", hotel.arrivalTimeUtcTo);
                hotelFormData.append("DepartureTimeUtcFrom", hotel.departureTimeUtcFrom);
                hotelFormData.append("DepartureTimeUtcTo", hotel.departureTimeUtcTo);
                hotelFormData.append("IsArchived", String(hotel.isArchived));
                hotelFormData.append("CategoryId", String(hotel.categoryId));
                hotelFormData.append("Address.street", hotel.address.street);
                hotelFormData.append("Address.houseNumber", hotel.address.houseNumber);
                hotelFormData.append("Address.floor", String(hotel.address.floor));
                hotelFormData.append("Address.apartmentNumber", String(hotel.address.apartmentNumber));
                hotelFormData.append("Address.cityId", String(hotel.address.cityId));

                if (hotel.hotelAmenityIds) {
                    hotel.hotelAmenityIds.forEach((hotelAmenityId) => {
                        hotelFormData.append("hotelAmenityIds[]", String(hotelAmenityId));
                    });
                }

                if (hotel.breakfastIds) {
                    hotel.breakfastIds.forEach((breakfastId) => {
                        hotelFormData.append("breakfastIds[]", String(breakfastId));
                    });
                }

                if (hotel.staffLanguageIds) {
                    hotel.staffLanguageIds.forEach((staffLanguageId) => {
                        hotelFormData.append("staffLanguageIds[]", String(staffLanguageId));
                    });
                }

                if (hotel.photos) {
                    hotel.photos.forEach((photo) => {
                        hotelFormData.append("photos", photo);
                    });
                }

                return {
                    url: "create",
                    method: "POST",
                    body: hotelFormData,
                };
            },
            invalidatesTags: ["Hotels"],
        }),

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

        deleteHotel: builder.mutation({
            query: (id: number) => ({
                url: `delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Hotels"],
        }),

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
    // useGetRealtorHotelsPageQuery,
    useCreateHotelMutation,
    // useUpdateHotelMutation,
    useDeleteHotelMutation,
    useSetArchiveStatusHotelMutation,
    useGetMaxHotelPriceQuery,
} = hotelApi;
