
export interface IRoomUpdate {
    id: number;
    name: string;
    area: number;
    numberOfRooms: number;
    quantity: number;
    roomTypeId: number;
    rentalPeriodIds?: number[];
    roomAmenityIds?: number[];
}