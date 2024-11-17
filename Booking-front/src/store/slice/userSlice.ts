import { createSlice } from "@reduxjs/toolkit";
import { User, UserState } from "interfaces/user";
import { jwtParser } from "utils/jwtParser.ts";
import { jwtDecode } from "jwt-decode";

const getLocation = (token?: string | null) => {
    if (!token)
        return "";

    const user = jwtDecode<User>(token);
    const roles = user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    if (roles.includes("Admin"))
        return "/admin";
    if (roles.includes("Realtor"))
        return "/realtor";
    if (roles.includes("Customer"))
        return "";

    return "";
};

const initialState: UserState = {
    location: getLocation(localStorage.getItem("authToken")),
    user: jwtParser(localStorage.getItem("authToken")) as User,
    token: localStorage.getItem("authToken") || null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setToken: (state, action: { payload: string }) => {
            localStorage.setItem("authToken", action.payload);
            state.token = action.payload;
            state.user = jwtParser(action.payload) as User;
            state.location = getLocation(action.payload);
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("authToken");
        },
    },
});

export const getUser = (state: { user: UserState }) => state.user.user;
export const getToken = (state: { user: UserState }) => state.user.token;
export const getUserLocation = (state: { user: UserState }) => state.user.location;
export const { setToken, logOut } = userSlice.actions;

export default userSlice.reducer;
