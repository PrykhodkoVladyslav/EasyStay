export default interface IBookingRoomVariant {
    quantity: number;
    roomVariantId: number;
    bookingBedSelection: {
        isSingleBed?: boolean;
        isDoubleBed?: boolean;
        isExtraBed?: boolean;
        isSofa?: boolean;
        isKingsizeBed?: boolean;
    }[];
}
