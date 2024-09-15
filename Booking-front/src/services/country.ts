import { createApi } from "@reduxjs/toolkit/query/react";
// import { Country, GetCountryPageRequest } from "interfaces/country";
import { Country } from "interfaces/Country";
// import { GetPageResponse } from "interfaces/hotel.ts";
import { createBaseQuery } from "utils/apiUtils.ts";
import {City} from "interfaces/city";
// import { createQueryString } from "utils/createQueryString.ts";

export const countryApi = createApi({
    reducerPath: "countryApi",
    baseQuery: createBaseQuery("countries"),
    tagTypes: ["Countries"],

    endpoints: (builder) => ({
        getCountry: builder.query<Country[], string>({
            query: (id) => `getById/${id}`,
            providesTags: ["Countries"],
        }),

        getAllCountries: builder.query<Country[], void>({
            query: () => "getAll",
            providesTags: ["Countries"],
        }),

        // getPageCountries: builder.query<GetPageResponse<City>, GetCountryPageRequest>({
        //     query: (params) => {
        //         const queryString = createQueryString(params as Record<string, any>);
        //         return `getPage?${queryString}`;
        //     },
        // }),

        addCountry: builder.mutation({
            query: (country: { name: string; image: File }) => {
                const countryFormData = new FormData();
                countryFormData.append("Name", country.name);
                if (country.image) {
                    countryFormData.append("Image", country.image);
                }

                return {
                    url: "create",
                    method: "POST",
                    body: countryFormData,
                };
            },
            invalidatesTags: ["Countries"],
        }),

        updateCountry: builder.mutation({
            query: (country: Country) => {
                const countryFormData = new FormData();
                countryFormData.append("Id", country.id);
                countryFormData.append("Name", country.name);
                if (country.image) {
                    countryFormData.append("Image", country.image);
                }

                return {
                    url: `update`,
                    method: "PUT",
                    body: countryFormData,
                };
            },
            invalidatesTags: ["Countries"],
        }),

        deleteCountry: builder.mutation({
            query: (id: number) => ({
                url: `delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Countries"],
        }),
    }),
});

export const {
    useGetCountryQuery,
    useGetAllCountriesQuery,
    useAddCountryMutation,
    useUpdateCountryMutation,
    useDeleteCountryMutation,
    useGetPageCountriesQuery
} = countryApi;
