import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/apiUtils.ts";
import IGender from "interfaces/gender/IGender.ts";

export const genderApi = createApi({
    reducerPath: "genderApi",
    baseQuery: createBaseQuery("genders"),
    tagTypes: ["Genders"],

    endpoints: (build) => ({
        getAllGenders: build.query<IGender[], void>({
            query: () => "getAll",
            providesTags: ["Genders"],
        }),
    }),
});

export const {
    useGetAllGendersQuery,
} = genderApi;