import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/apiUtils.ts";
import IBreakfast from "interfaces/breakfast/IBreakfast.ts";

export const breakfastApi = createApi({
    reducerPath: "breakfastApi",
    baseQuery: createBaseQuery("breakfasts"),
    tagTypes: ["Breakfasts"],

    endpoints: (build) => ({
        getAllBreakfasts: build.query<IBreakfast[], void>({
            query: () => "getAll",
            providesTags: ["Breakfasts"],
        }),
    }),
});

export const {
    useGetAllBreakfastsQuery,
} = breakfastApi;