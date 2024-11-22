import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/apiUtils.ts";
import IBankCard from "interfaces/bankCard/IBankCard.ts";
import ICreateBankCardRequest from "interfaces/bankCard/ICreateBankCardRequest.ts";

export const bankCardApi = createApi({
    reducerPath: "bankCardApi",
    baseQuery: createBaseQuery("bankCards"),
    tagTypes: ["BankCards"],

    endpoints: (build) => ({
        getAllBankCards: build.query<IBankCard[], void>({
            query: () => "getAll",
            providesTags: ["BankCards"],
        }),

        createBankCard: build.mutation<number, ICreateBankCardRequest>({
            query: (bankCard) => ({
                url: "create",
                method: "POST",
                body: bankCard,
            }),
            invalidatesTags: ["BankCards"],
        }),

        deleteBankCard: build.mutation<void, number>({
            query: (id) => ({
                url: `delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["BankCards"],
        }),
    }),
});

export const {
    useGetAllBankCardsQuery,
    useCreateBankCardMutation,
    useDeleteBankCardMutation,
} = bankCardApi;