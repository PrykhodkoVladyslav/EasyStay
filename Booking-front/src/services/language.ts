import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/apiUtils.ts";
import {ILanguage} from "interfaces/language";

export const languageApi = createApi({
    reducerPath: "languagesApi",
    baseQuery: createBaseQuery("languages"),
    tagTypes: ["Languages"],

    endpoints: (builder) => ({
        getAllLanguages: builder.query<ILanguage[], void>({
            query: () => "getAll",
            providesTags: ["Languages"],
        }),
    }),
})

export const {
    useGetAllLanguagesQuery,
} = languageApi;
