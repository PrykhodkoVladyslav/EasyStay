using AutoMapper;
using EasyStay.Application.Interfaces;
using EasyStay.Application.MediatR.Hotels.Queries.GetPage;
using EasyStay.Application.MediatR.Hotels.Queries.Shared;
using EasyStay.Domain;
using Microsoft.EntityFrameworkCore;

namespace EasyStay.WebApi.Services.PaginationServices;

public class HotelPaginationService(
	IEasyStayDbContext context,
	IMapper mapper,
	ITimeConverter timeConverter,
	ICurrentUserService currentUser
) : BasePaginationService<Hotel, HotelVm, GetHotelsPageQuery>(mapper) {

	protected override IQueryable<Hotel> GetQuery() => context.Hotels.AsNoTracking().AsSplitQuery().OrderBy(h => h.Id);

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

		if (filter.ArrivalTimeUtcFrom.HasValue) {
			var dateTimeOffset = timeConverter.ToDateTimeOffsetFromUtcTimeOnly(filter.ArrivalTimeUtcFrom.Value);
			query = query.Where(h => h.ArrivalTimeUtcFrom == dateTimeOffset);
		}
		if (filter.MinArrivalTimeUtcFrom.HasValue) {
			var dateTimeOffset = timeConverter.ToDateTimeOffsetFromUtcTimeOnly(filter.MinArrivalTimeUtcFrom.Value);
			query = query.Where(h => h.ArrivalTimeUtcFrom >= dateTimeOffset);
		}
		if (filter.MaxArrivalTimeUtcFrom.HasValue) {
			var dateTimeOffset = timeConverter.ToDateTimeOffsetFromUtcTimeOnly(filter.MaxArrivalTimeUtcFrom.Value);
			query = query.Where(h => h.ArrivalTimeUtcFrom <= dateTimeOffset);
		}

		if (filter.ArrivalTimeUtcTo.HasValue) {
			var dateTimeOffset = timeConverter.ToDateTimeOffsetFromUtcTimeOnly(filter.ArrivalTimeUtcTo.Value);
			query = query.Where(h => h.ArrivalTimeUtcTo == dateTimeOffset);
		}
		if (filter.MinArrivalTimeUtcTo.HasValue) {
			var dateTimeOffset = timeConverter.ToDateTimeOffsetFromUtcTimeOnly(filter.MinArrivalTimeUtcTo.Value);
			query = query.Where(h => h.ArrivalTimeUtcTo >= dateTimeOffset);
		}
		if (filter.MaxArrivalTimeUtcTo.HasValue) {
			var dateTimeOffset = timeConverter.ToDateTimeOffsetFromUtcTimeOnly(filter.MaxArrivalTimeUtcTo.Value);
			query = query.Where(h => h.ArrivalTimeUtcTo <= dateTimeOffset);
		}

		if (filter.DepartureTimeUtcFrom.HasValue) {
			var dateTimeOffset = timeConverter.ToDateTimeOffsetFromUtcTimeOnly(filter.DepartureTimeUtcFrom.Value);
			query = query.Where(h => h.DepartureTimeUtcFrom == dateTimeOffset);
		}
		if (filter.MinDepartureTimeUtcFrom.HasValue) {
			var dateTimeOffset = timeConverter.ToDateTimeOffsetFromUtcTimeOnly(filter.MinDepartureTimeUtcFrom.Value);
			query = query.Where(h => h.DepartureTimeUtcFrom >= dateTimeOffset);
		}
		if (filter.MaxDepartureTimeUtcFrom.HasValue) {
			var dateTimeOffset = timeConverter.ToDateTimeOffsetFromUtcTimeOnly(filter.MaxDepartureTimeUtcFrom.Value);
			query = query.Where(h => h.DepartureTimeUtcFrom <= dateTimeOffset);
		}

		if (filter.DepartureTimeUtcTo.HasValue) {
			var dateTimeOffset = timeConverter.ToDateTimeOffsetFromUtcTimeOnly(filter.DepartureTimeUtcTo.Value);
			query = query.Where(h => h.DepartureTimeUtcTo == dateTimeOffset);
		}
		if (filter.MinDepartureTimeUtcTo.HasValue) {
			var dateTimeOffset = timeConverter.ToDateTimeOffsetFromUtcTimeOnly(filter.MinDepartureTimeUtcTo.Value);
			query = query.Where(h => h.DepartureTimeUtcTo >= dateTimeOffset);
		}
		if (filter.MaxDepartureTimeUtcTo.HasValue) {
			var dateTimeOffset = timeConverter.ToDateTimeOffsetFromUtcTimeOnly(filter.MaxDepartureTimeUtcTo.Value);
			query = query.Where(h => h.DepartureTimeUtcTo <= dateTimeOffset);
		}

		if (filter.IsArchived is not null)
			query = query.Where(h => h.IsArchived == filter.IsArchived);

		if (filter.Address is not null) {
			var address = filter.Address;

			if (address.Id is not null)
				query = query.Where(h => h.AddressId == address.Id);

			if (address.Street is not null)
				query = query.Where(h => h.Address.Street.ToLower().Contains(address.Street));

			if (address.HouseNumber is not null)
				query = query.Where(h => h.Address.HouseNumber.ToLower().Contains(address.HouseNumber));

			if (address.ByFloor == true)
				query = query.Where(h => h.Address.Floor == address.Floor);

			if (address.ByApartmentNumber == true)
				query = query.Where(h => h.Address.ApartmentNumber == address.ApartmentNumber);

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
			query = query.Where(h => h.HotelCategoryId == filter.CategoryId);

		if (filter.RealtorId is not null)
			query = query.Where(h => h.RealtorId == filter.RealtorId);

		if (filter.OnlyOwn == true)
			query = query.Where(h => h.RealtorId == currentUser.GetRequiredUserId());

		if (filter.AllHotelAmenityIds is not null)
			query = query.Where(
				h => filter.AllHotelAmenityIds.All(
					haId => h.HotelHotelAmenities.Any(hha => hha.HotelAmenityId == haId)
				)
			);

		if (filter.AnyHotelAmenityIds is not null)
			query = query.Where(
				h => filter.AnyHotelAmenityIds.Any(
					haId => h.HotelHotelAmenities.Any(hha => hha.HotelAmenityId == haId)
				)
			);

		if (filter.AllBreakfastIds is not null)
			query = query.Where(
				h => filter.AllBreakfastIds.All(
					bId => h.HotelBreakfasts.Any(hb => hb.BreakfastId == bId)
				)
			);

		if (filter.AnyBreakfastIds is not null)
			query = query.Where(
				h => filter.AnyBreakfastIds.Any(
					bId => h.HotelBreakfasts.Any(hb => hb.BreakfastId == bId)
				)
			);

		if (filter.AllLanguageIds is not null)
			query = query.Where(
				h => filter.AllLanguageIds.All(
					lId => h.HotelStaffLanguages.Any(hsl => hsl.LanguageId == lId)
				)
			);

		if (filter.AnyLanguageIds is not null)
			query = query.Where(
				h => filter.AnyLanguageIds.Any(
					lId => h.HotelStaffLanguages.Any(hsl => hsl.LanguageId == lId)
				)
			);

		return query;
	}
}
