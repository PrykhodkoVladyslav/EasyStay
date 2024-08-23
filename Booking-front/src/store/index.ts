import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from "store/slice/userSlice.ts";
import { userApi } from "services/user.ts";
import { hotelApi } from "services/hotel.ts";
import { hotelCategoriesApi } from "services/hotelCategories.ts";
import { cityApi } from "services/city.ts";
import { countryApi } from "services/country.ts";
// import { bookingApi } from "services/booking.ts";
// import { favoriteHotelsApi } from "services/favoriteHotels.ts";
// import { reviewApi } from "services/review.ts";
// import { roomApi } from "services/rooms.ts";
// import {convenienceApi} from "services/convenience.ts";

export const store = configureStore({
    reducer: {
        user: userReducer,
        [userApi.reducerPath]: userApi.reducer,
        [hotelApi.reducerPath]: hotelApi.reducer,
        [hotelCategoriesApi.reducerPath]: hotelCategoriesApi.reducer,
        [cityApi.reducerPath]: cityApi.reducer,
        [countryApi.reducerPath]: countryApi.reducer,
        // [roomApi.reducerPath]: roomApi.reducer,
        // [reviewApi.reducerPath]: reviewApi.reducer,
        // [bookingApi.reducerPath]: bookingApi.reducer,
        // [favoriteHotelsApi.reducerPath]: favoriteHotelsApi.reducer,
        // [convenienceApi.reducerPath]: convenienceApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            userApi.middleware,
            cityApi.middleware,
            hotelApi.middleware,
            hotelCategoriesApi.middleware,
            countryApi.middleware,
            // reviewApi.middleware,
            // roomApi.middleware,
            // bookingApi.middleware,
            // favoriteHotelsApi.middleware,
            // convenienceApi.middleware
        ),
});

setupListeners(store.dispatch);

// Типізація Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
