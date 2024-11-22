import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/apiUtils.ts";
import IRentalPeriod from "interfaces/rentalPeriod/IRentalPeriod.ts";

export const rentalPeriodApi = createApi({
    reducerPath: "rentalPeriodApi",
    baseQuery: createBaseQuery("rentalPeriods"),
    tagTypes: ["RentalPeriods"],

    endpoints: (build) => ({
        getAllRentalPeriods: build.query<IRentalPeriod[], void>({
            query: () => "getAll",
            providesTags: ["RentalPeriods"],
        }),
    }),
});

export const {
    useGetAllRentalPeriodsQuery,
} = rentalPeriodApi;