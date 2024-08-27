import { createApi } from "@reduxjs/toolkit/query/react";
// import { City, GetCityPageRequest } from "interfaces/country";
import { City } from "interfaces/city";
// import { GetPageResponse } from "interfaces/hotel.ts";
import { createBaseQuery } from "utils/apiUtils.ts";
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

        // getPageCities: builder.query<GetPageResponse<City>, GetCityPageRequest>({
        //     query: (params) => {
        //         const queryString = createQueryString(params as Record<string, any>);
        //         return `getPage?${queryString}`;
        //     },
        // }),

        updateCity: builder.mutation<City, Partial<City>>({
            query: ({ id, ...patch }) => ({
                url: `update`,
                method: "PUT",
                body: patch,
            }),
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
    useDeleteCityMutation,
    useGetPageCitiesQuery
} = cityApi;
