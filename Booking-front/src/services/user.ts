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
} from "interfaces/user";
import ICustomer from "interfaces/user/ICustomer.ts";
import IPage from "interfaces/page/IPage.ts";
import IRealtor from "interfaces/user/IRealtor.ts";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: createBaseQuery("accounts"),
    tagTypes: ["User", "Citizenships"],

    endpoints: (builder) => ({
        getAllCustomers: builder.query<IPage<ICustomer>, void>({
            query: () => "GetCustomerPage",
            providesTags: ["User"],
        }),

        getAllRealtors: builder.query<IPage<IRealtor>, void>({
            query: () => "GetRealtorPage",
            providesTags: ["User"],
        }),

        getRealtorsInformation: builder.query<IRealtorInformation, void>({
            query: () => "GetRealtorsInformation",
            providesTags: ["User"],
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
            invalidatesTags: ["User"],
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
            invalidatesTags: ["User"],
        }),

        unlockUser: builder.mutation<void, UnlockUserRequest>({
            query: (request) => ({
                url: `unlockUserById/${request.id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["User"],
        }),

        sendResetPasswordEmail: builder.mutation<void, ISendResetPasswordEmailRequest>({
            query: (data) => ({
                url: "sendResetPasswordEmail",
                method: "POST",
                body: data,
            }),
        }),

        resetPassword: builder.mutation<void, IResetPasswordRequest>({
            query: (data) => ({
                url: "resetPassword",
                method: "POST",
                body: data,
            }),
        }),

        updateRealtorsInformation: builder.mutation<void, IUpdateRealtorInformation>({
            query: (data) => {
                return {
                    url: "updateRealtorsInformation",
                    method: "PATCH",
                    body: data,
                };
            },
        }),
    }),
});

export const {
    useGetAllCustomersQuery,
    useGetAllRealtorsQuery,
    useGetRealtorsInformationQuery,
    useSignInMutation,
    useRegistrationMutation,
    useCreateAdminMutation,
    useBlockUserMutation,
    useUnlockUserMutation,
    useSendResetPasswordEmailMutation,
    useResetPasswordMutation,
    useUpdateRealtorsInformationMutation,
} = userApi;
