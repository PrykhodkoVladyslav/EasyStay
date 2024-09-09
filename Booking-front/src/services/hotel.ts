import { createApi } from "@reduxjs/toolkit/query/react";
import { /*CreateHotel,*/
    Hotel,
    // GetHotelPageRequest,
    // GetPageResponse,
    SetArchiveStatusRequest,
} from "interfaces/hotel";
import { createBaseQuery } from "utils/apiUtils.ts";

export const hotelApi = createApi({
    reducerPath: "hotelApi",
    baseQuery: createBaseQuery("hotels"),
    tagTypes: ["Hotels"],

    endpoints: (builder) => ({
        getHotel: builder.query<Hotel[], string>({
            query: (id) => `getById/${id}`,
        }),

        getAllHotels: builder.query<Hotel[], void>({
            query: () => "getAll",
            providesTags: ["Hotels"],
        }),

        getRealtorHotelsPage: builder.query<Hotel[], { RealtorId?: string }>({
            query: ({ RealtorId }) => `GetPage?${RealtorId ? `RealtorId=${RealtorId}` : ''}`,
            providesTags: ["Hotels"],
        }),

        // getPageHotels: builder.query<GetPageResponse<Hotel>, GetHotelPageRequest>({
        //     query: (params) => {
        //         const queryString = createQueryString(params as Record<string, any>);
        //         return `getPage?${queryString}`;
        //     },
        // }),

        addHotel: builder.mutation({
            query: (hotel) => {
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
                hotelFormData.append("Id", hotel.id);
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
                    url: "update",
                    method: "PUT",
                    body: hotelFormData,
                };
            },
            invalidatesTags: ["Hotels"],
        }),

        deleteHotel: builder.mutation({
            query: (id: number) => ({
                url: `delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Hotels"],
        }),

        setArchiveStatusHotel: builder.mutation<void, SetArchiveStatusRequest>({
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
    }),
});

export const {
    useGetHotelQuery,
    // useGetAllHotelsQuery,
    useGetRealtorHotelsPageQuery,
    useAddHotelMutation,
    useUpdateHotelMutation,
    useDeleteHotelMutation,
    useSetArchiveStatusHotelMutation,
} = hotelApi;
