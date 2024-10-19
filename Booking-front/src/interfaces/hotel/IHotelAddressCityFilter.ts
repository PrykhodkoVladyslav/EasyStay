export default interface IHotelAddressCityFilter {
    id?: number;

    name?: string;

    longitude?: number;
    latitude?: number;

    minLongitude?: number;
    maxLongitude?: number;
    minLatitude?: number;
    maxLatitude?: number;

    countryId?: number;
}