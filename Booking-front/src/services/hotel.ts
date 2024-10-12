import { createApi } from "@reduxjs/toolkit/query/react";
import { /*CreateHotel,*/
    IHotelCreate,
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

        createHotel: builder.mutation<void, IHotelCreate>({
            query: (hotel) => ({
                url: "create",
                method: "POST",
                body: hotel,
            }),
            invalidatesTags: ["Hotels"],
        }),



        getHotel: builder.query<Hotel[], string>({
            query: (id) => `getById/${id}`,
        }),

        getAllHotels: builder.query<Hotel[], void>({
            query: () => "getAll",
            providesTags: ["Hotels"],
        }),

        getRealtorHotelsPage: builder.query<Hotel[], { RealtorId?: string }>({
            query: ({ RealtorId }) => `getPage?${RealtorId ? `RealtorId=${RealtorId}` : ''}`,
            providesTags: ["Hotels"],
        }),

        // getPageHotels: builder.query<GetPageResponse<Hotel>, GetHotelPageRequest>({
        //     query: (params) => {
        //         const queryString = createQueryString(params as Record<string, any>);
        //         return `getPage?${queryString}`;
        //     },
        // }),

        updateHotel: builder.mutation({
            query: (hotel: Hotel) => {
                const hotelFormData = new FormData();
                hotelFormData.append("Id", hotel.id.toString());
                hotelFormData.append("Name", hotel.name);
                hotelFormData.append("Description", hotel.description);
                hotelFormData.append("Area", hotel.area.toString());
                hotelFormData.append("NumberOfRooms", hotel.numberOfRooms.toString());
                hotelFormData.append("IsArchived", hotel.isArchived.toString());
                hotelFormData.append("Address.Street", hotel.address.street);
                hotelFormData.append("Address.HouseNumber", hotel.address.houseNumber);
                hotelFormData.append("Address.Latitude", hotel.address.latitude.toString());
                hotelFormData.append("Address.Longitude", hotel.address.longitude.toString());
                hotelFormData.append("Address.CityId", hotel.address.city.id.toString());
                hotelFormData.append("CategoryId", hotel.category.id.toString());
                if (hotel.photos) {
                    Array.from(hotel.photos).forEach((image) => hotelFormData.append("Photos", image as File));
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
                url: "setArchiveStatus",
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
    useCreateHotelMutation,

    useGetHotelQuery,
    useGetAllHotelsQuery,
    useGetRealtorHotelsPageQuery,
    useAddHotelMutation,
    useUpdateHotelMutation,
    useDeleteHotelMutation,
    useSetArchiveStatusHotelMutation,
} = hotelApi;
