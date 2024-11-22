
export interface IRoomCreate {
    name: string;
    area: number;
    numberOfRooms: number;
    quantity: number;
    hotelId: number;
    roomTypeId: number;
    rentalPeriodIds?: number[];
    roomAmenityIds?: number[];
}
