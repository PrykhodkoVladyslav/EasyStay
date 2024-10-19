import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/apiUtils.ts";
import {
    ICitizenship,
} from "interfaces/citizenship";

export const citizenshipApi = createApi({
    reducerPath: "citizenshipsApi",
    baseQuery: createBaseQuery("citizenships"),
    tagTypes: ["Citizenships"],

    endpoints: (builder) => ({
        getAllCitizenships: builder.query<ICitizenship[], void>({
            query: () => "getAll",
            providesTags: ["Citizenships"],
        }),
    }),
});

export const {
    useGetAllCitizenshipsQuery,
} = citizenshipApi;
