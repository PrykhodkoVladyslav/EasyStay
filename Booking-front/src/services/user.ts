import { createApi } from "@reduxjs/toolkit/query/react";
import { SignInResponse, Registration, SignInRequest, User } from "interfaces/user";
import { createBaseQuery } from "utils/apiUtils.ts";

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

        deleteUser: builder.mutation({
            query: (id: number) => ({
                url: `delete/${id}`,
                method: "DELETE",
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
    useDeleteUserMutation,
} = userApi;
