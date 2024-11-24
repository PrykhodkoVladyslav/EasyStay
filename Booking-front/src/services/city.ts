import { createApi } from "@reduxjs/toolkit/query/react";
import { City, CreateCity } from "interfaces/city";
import { createBaseQuery } from "utils/apiUtils.ts";
import IPage from "interfaces/page/IPage.ts";
import ICityAdvertising from "interfaces/city/ICityAdvertising.ts";
import IGetCitiesAdvertisingPageQuery, {
    toQueryFromIGetCitiesAdvertisingPageQuery,
} from "interfaces/city/IGetCitiesAdvertisingPageQuery.ts";

export const cityApi = createApi({
    reducerPath: "cityApi",
    baseQuery: createBaseQuery("cities"),
    tagTypes: ["Cities"],

    endpoints: (builder) => ({
        getCity: builder.query<City[], string>({
            query: (id) => `getById/${id}`,
            providesTags: ["Cities"],
        }),

        getAllCities: builder.query<City[], void>({
            query: () => "getAll",
            providesTags: ["Cities"],
        }),

        getCitiesAdvertisingPage: builder.query<IPage<ICityAdvertising>, IGetCitiesAdvertisingPageQuery>({
            query: (query) => {
                const baseQuery = "GetAdvertisingPage";

                if (!query)
                    return baseQuery;

                return `${baseQuery}?${toQueryFromIGetCitiesAdvertisingPageQuery(query)}`;
            },
            providesTags: ["Cities"],
        }),

        addCity: builder.mutation({
            query: (city: CreateCity) => {
                const cityFormData = new FormData();
                cityFormData.append("Name", city.name);
                cityFormData.append("Longitude", city.longitude.toString());
                cityFormData.append("Latitude", city.latitude.toString());
                cityFormData.append("CountryId", city.country.id.toString());
                if (city.image) {
                    cityFormData.append("Image", city.image);
                }

                return {
                    url: "create",
                    method: "POST",
                    body: cityFormData,
                };
            },
            invalidatesTags: ["Cities"],
        }),

        updateCity: builder.mutation({
            query: (city: City) => {
                const cityFormData = new FormData();
                cityFormData.append("Id", city.id.toString());
                cityFormData.append("Name", city.name);
                cityFormData.append("Longitude", city.longitude.toString());
                cityFormData.append("Latitude", city.latitude.toString());
                cityFormData.append("CountryId", city.country.id.toString());
                if (city.image) {
                    cityFormData.append("Image", city.image);
                }

                return {
                    url: `update`,
                    method: "PUT",
                    body: cityFormData,
                };
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
    useGetCityQuery,
    useGetAllCitiesQuery,
    useGetCitiesAdvertisingPageQuery,
    useAddCityMutation,
    useUpdateCityMutation,
    useDeleteCityMutation,
} = cityApi;
