import { createApi } from "@reduxjs/toolkit/query/react";
// import { City, GetCityPageRequest } from "interfaces/country";
import { City } from "interfaces/city";
// import { GetPageResponse } from "interfaces/hotel.ts";
import { createBaseQuery } from "utils/apiUtils.ts";
import {Hotel} from "interfaces/hotel";
// import { createQueryString } from "utils/createQueryString.ts";

export const cityApi = createApi({
    reducerPath: "cityApi",
    baseQuery: createBaseQuery("cities"),
    tagTypes: ["Cities"],

    endpoints: (builder) => ({
        getAllCities: builder.query<City[], void>({
            query: () => "getAll",
            providesTags: ["Cities"],
        }),

        getCity: builder.query<City[], string>({
            query: (id) => `getById/${id}`,
        }),

        // getPageCities: builder.query<GetPageResponse<City>, GetCityPageRequest>({
        //     query: (params) => {
        //         const queryString = createQueryString(params as Record<string, any>);
        //         return `getPage?${queryString}`;
        //     },
        // }),

        updateCity: builder.mutation({
            query: (city: City) => {
                const cityFormData = new FormData();
                cityFormData.append("Id", city.id);
                cityFormData.append("Name", city.name);
                cityFormData.append("Longitude", city.longitude);
                cityFormData.append("Latitude", city.latitude);
                cityFormData.append("CountryId", city.countryId?.toString());

                if (city.image) {
                    cityFormData.append("Image", city.image);
                }

                return {
                    url: `update`,
                    method: "PUT",
                    body: cityFormData,
                }
            },
            invalidatesTags: ["Cities"],
        }),

        deleteCity: builder.mutation({
            query: (id: number) => ({
                url: `delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cities"],
        }),
    }),
});

export const {
    useGetAllCitiesQuery,
    useGetCityQuery,
    useDeleteCityMutation,
    useUpdateCityMutation,
    useGetPageCitiesQuery
} = cityApi;
