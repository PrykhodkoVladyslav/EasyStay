import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "utils/apiUtils.ts";
import ICreateBookingRequest from "interfaces/booking/ICreateBookingRequest.ts";
import { format } from "date-fns";

export const bookingApi = createApi({
    reducerPath: "bookingApi",
    baseQuery: createBaseQuery("bookings"),
    tagTypes: ["Bookings"],

    endpoints: (build) => ({
        createBooking: build.mutation<number, ICreateBookingRequest>({
            query: (booking) => ({
                url: "create",
                method: "POST",
                body: {
                    dateFrom: format(booking.dateFrom, "yyyy-MM-dd"),
                    dateTo: format(booking.dateTo, "yyyy-MM-dd"),
                    personalWishes: booking.personalWishes,
                    estimatedTimeOfArrivalUtc: format(booking.estimatedTimeOfArrivalUtc, "HH:mm:ss"),
                    bankCardId: booking.bankCardId,
                    bankCard: booking.bankCard,
                    bookingRoomVariants: booking.bookingRoomVariants,
                },
            }),
            invalidatesTags: ["Bookings"],
        }),
    }),
});

export const {
    useCreateBookingMutation,
} = bookingApi;