import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/apiUtils.ts";
import {
    SignInResponse,
    SignInRequest,
    Registration,
    CreateAdmin,
    BlockUserRequest,
    UnlockUserRequest,
    ISendResetPasswordEmailRequest,
    IResetPasswordRequest,
    IRealtorInformation,
    IUpdateRealtorInformation,
    IRealtorDetails,
    ICustomerInformation,
    IUpdateCustomerInformation,
} from "interfaces/user";
import ICustomer from "interfaces/user/ICustomer.ts";
import IPage from "interfaces/page/IPage.ts";
import IRealtor from "interfaces/user/IRealtor.ts";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: createBaseQuery("accounts"),
    tagTypes: ["Users"],

    endpoints: (builder) => ({
        getAllCustomers: builder.query<IPage<ICustomer>, void>({
            query: () => "GetCustomerPage",
            providesTags: ["Users"],
        }),

        getAllRealtors: builder.query<IPage<IRealtor>, void>({
            query: () => "GetRealtorPage",
            providesTags: ["Users"],
        }),

        getRealtorDetails: builder.query<IRealtorDetails, string>({
            query: (id) => `GetRealtorDatails/${id}`,
            providesTags: ["Users"],
        }),

        getCustomersInformation: builder.query<ICustomerInformation, void>({
            query: () => "GetCustomersInformation",
            providesTags: ["Users"],
        }),

        getRealtorsInformation: builder.query<IRealtorInformation, void>({
            query: () => "GetRealtorsInformation",
            providesTags: ["Users"],
        }),

        getRealtorsPersonalRating: builder.query<number, void>({
            query: () => "GetRealtorsPersonalRating",
            providesTags: ["Users"],
        }),

        signIn: builder.mutation<SignInResponse, SignInRequest>({
            query: (data) => {
                const formData = new FormData();
                formData.append("email", data.email);
                formData.append("password", data.password);

                return {
                    url: "SignIn",
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: ["Users"],
        }),

        registration: builder.mutation<SignInResponse, Registration>({
            query: (data) => {
                const formData = new FormData();
                formData.append("FirstName", data.firstName);
                formData.append("LastName", data.lastName);
                if (Array.isArray(data.image) && data.image.length > 0) {
                    formData.append("Image", data.image[0]);
                }
                formData.append("Email", data.email);
                formData.append("UserName", data.username);
                formData.append("Password", data.password);
                formData.append("Type", data.type);

                return {
                    url: "Registration",
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: ["Users"],
        }),

        createAdmin: builder.mutation<void, CreateAdmin>({
            query: (data: CreateAdmin) => {
                const formData = new FormData();
                formData.append("FirstName", data.firstName);
                formData.append("LastName", data.lastName);
                if (data.image) {
                    formData.append("Image", data.image);
                }
                formData.append("Email", data.email);
                formData.append("UserName", data.username);
                formData.append("Password", data.password);

                return {
                    url: "createAdmin",
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: ["Users"],
        }),

        blockUser: builder.mutation<void, BlockUserRequest>({
            query: ({ id, lockoutEndUtc }) => ({
                url: "blockUserById",
                method: "PATCH",
                body: {
                    id,
                    lockoutEndUtc: lockoutEndUtc,
                },
            }),
            invalidatesTags: ["Users"],
        }),

        unlockUser: builder.mutation<void, UnlockUserRequest>({
            query: (request) => ({
                url: `unlockUserById/${request.id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Users"],
        }),

        sendResetPasswordEmail: builder.mutation<void, ISendResetPasswordEmailRequest>({
            query: (data) => ({
                url: "sendResetPasswordEmail",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Users"],
        }),

        resetPassword: builder.mutation<void, IResetPasswordRequest>({
            query: (data) => ({
                url: "resetPassword",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Users"],
        }),

        updateCustomersInformation: builder.mutation<void, IUpdateCustomerInformation>({
            query: (data) => {
                return {
                    url: "updateCustomersInformation",
                    method: "PATCH",
                    body: data,
                };
            },
            invalidatesTags: ["Users"],
        }),

        updateRealtorsInformation: builder.mutation<void, IUpdateRealtorInformation>({
            query: (data) => {
                return {
                    url: "updateRealtorsInformation",
                    method: "PATCH",
                    body: data,
                };
            },
            invalidatesTags: ["Users"],
        }),
    }),
});

export const {
    useGetAllCustomersQuery,
    useGetAllRealtorsQuery,
    useGetCustomersInformationQuery,
    useGetRealtorsInformationQuery,
    useGetRealtorDetailsQuery,
    useGetRealtorsPersonalRatingQuery,
    useSignInMutation,
    useRegistrationMutation,
    useCreateAdminMutation,
    useBlockUserMutation,
    useUnlockUserMutation,
    useSendResetPasswordEmailMutation,
    useResetPasswordMutation,
    useUpdateCustomersInformationMutation,
    useUpdateRealtorsInformationMutation,
} = userApi;
