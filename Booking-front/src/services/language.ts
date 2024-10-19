import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/apiUtils.ts";
import ILanguage from "interfaces/language/ILanguage.ts";

export const languageApi = createApi({
    reducerPath: "languageApi",
    baseQuery: createBaseQuery("languages"),
    tagTypes: ["Languages"],

    endpoints: (build) => ({
        getAllLanguages: build.query<ILanguage[], void>({
            query: () => "getAll",
            providesTags: ["Languages"],
        }),
    }),
});

export const {
    useGetAllLanguagesQuery,
} = languageApi;