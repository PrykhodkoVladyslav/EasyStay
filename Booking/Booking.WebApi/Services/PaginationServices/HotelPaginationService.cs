using AutoMapper;
using Booking.Application.Interfaces;
using Booking.Application.MediatR.Hotels.Queries.GetPage;
using Booking.Application.MediatR.Hotels.Queries.Shared;
using Booking.Domain;

namespace Booking.WebApi.Services.PaginationServices;

public class HotelPaginationService(
	IBookingDbContext context,
	IMapper mapper
) : BasePaginationService<Hotel, HotelVm, GetHotelsPageQuery>(mapper) {

	protected override IQueryable<Hotel> GetQuery() => context.Hotels.OrderBy(h => h.Id);

	protected override IQueryable<Hotel> FilterQuery(IQueryable<Hotel> query, GetHotelsPageQuery filter) {
		if (filter.IsRandomItems == true) {
			query = query.OrderBy(h => Guid.NewGuid());
		}
		else {
			query = query.OrderBy(h => h.Id);
		}

		if (filter.Name is not null)
			query = query.Where(h => h.Name.ToLower().Contains(filter.Name.ToLower()));

		if (filter.Description is not null)
			query = query.Where(h => h.Name.ToLower().Contains(filter.Description.ToLower()));

		if (filter.Area is not null)
			query = query.Where(h => h.Area == filter.Area);
		if (filter.MinArea is not null)
			query = query.Where(h => h.Area >= filter.MinArea);
		if (filter.MaxArea is not null)
			query = query.Where(h => h.Area <= filter.MaxArea);

		if (filter.NumberOfRooms is not null)
			query = query.Where(h => h.NumberOfRooms == filter.NumberOfRooms);
		if (filter.MinNumberOfRooms is not null)
			query = query.Where(h => h.NumberOfRooms >= filter.MinNumberOfRooms);
		if (filter.MaxNumberOfRooms is not null)
			query = query.Where(h => h.NumberOfRooms <= filter.MaxNumberOfRooms);

		if (filter.IsArchived is not null)
			query = query.Where(h => h.IsArchived == filter.IsArchived);

		if (filter.RealtorId is not null)
			query = query.Where(h => h.RealtorId == filter.RealtorId);

		if (filter.Address is not null) {
			var address = filter.Address;

			if (address.Id is not null)
				query = query.Where(h => h.AddressId == address.Id);

			if (address.Street is not null)
				query = query.Where(h => h.Address.Street.ToLower().Contains(address.Street));

			if (address.HouseNumber is not null)
				query = query.Where(h => h.Address.HouseNumber.ToLower().Contains(address.HouseNumber));

			if (address.City is not null) {
				var city = address.City;

				if (city.Id is not null)
					query = query.Where(h => h.Address.CityId == city.Id);

				if (city.Name is not null)
					query = query.Where(h => h.Address.City.Name.ToLower().Contains(city.Name.ToLower()));

				if (city.Longitude is not null)
					query = query.Where(h => h.Address.City.Longitude == city.Longitude);

				if (city.Latitude is not null)
					query = query.Where(h => h.Address.City.Latitude == city.Latitude);

				if (city.MinLongitude is not null)
					query = query.Where(h => h.Address.City.Longitude >= city.MinLongitude);
				if (city.MaxLongitude is not null)
					query = query.Where(h => h.Address.City.Longitude <= city.MaxLongitude);

				if (city.MinLatitude is not null)
					query = query.Where(h => h.Address.City.Latitude >= city.MinLatitude);
				if (city.MaxLatitude is not null)
					query = query.Where(h => h.Address.City.Latitude <= city.MaxLatitude);

				if (city.CountryId is not null)
					query = query.Where(h => h.Address.City.CountryId == city.CountryId);
			}
		}

		if (filter.CategoryId is not null)
			query = query.Where(h => h.CategoryId == filter.CategoryId);

		return query;
	}
}