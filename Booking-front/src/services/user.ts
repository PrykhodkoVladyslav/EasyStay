import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/apiUtils.ts";
import {
    SignInResponse,
    Registration,
    SignInRequest,
    User,
    // ResetPassword,
    // ResetPasswordRequest,
    BlockUserRequest,
    UnlockUserRequest,
} from "interfaces/user";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: createBaseQuery("accounts"),
    tagTypes: ["User"],

    endpoints: (builder) => ({
        getAllCustomers: builder.query<User[], void>({
            query: () => "GetCustomerPage",
            providesTags: ["User"],
        }),

        getAllRealtors: builder.query<User[], void>({
            query: () => "GetRealtorPage",
            providesTags: ["User"],
        }),

        // createAdmin: builder.mutation<LoginResponse, { email: string; password: string }>({
        //     query: (data) => {
        //         const formData = new FormData();
        //         formData.append("email", data.email);
        //         formData.append("password", data.password);
        //         formData.append("role", "admin");
        //         return {
        //             url: "Registration",
        //             method: "POST",
        //             body: formData,
        //         };
        //     },
        // }),

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
                if (data.image && data.image.length > 0) {
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

        blockUser: builder.mutation<void, BlockUserRequest>({
            query: ({ id, lockoutEndUtc }) => ({
                url: `BlockUserById`,
                method: "PATCH",
                body: {
                    id,
                    lockoutEndUtc: lockoutEndUtc,
                },
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ["User"],
        }),
        unlockUser: builder.mutation<void, UnlockUserRequest>({
            query: (id) => ({
                url: `UnlockUserById/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const {
    useGetAllCustomersQuery,
    useGetAllRealtorsQuery,
    useSignInMutation,
    useRegistrationMutation,
    useBlockUserMutation,
    useUnlockUserMutation,
} = userApi;
