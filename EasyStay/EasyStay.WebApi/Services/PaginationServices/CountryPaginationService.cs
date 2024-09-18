using AutoMapper;
using Booking.Application.Interfaces;
using Booking.Application.MediatR.Countries.Queries.GetPage;
using Booking.Application.MediatR.Countries.Queries.Shared;
using Booking.Domain;

namespace Booking.WebApi.Services.PaginationServices;

public class CountryPaginationService(
	IBookingDbContext context,
	IMapper mapper
) : BasePaginationService<Country, CountryVm, GetCountriesPageQuery>(mapper) {

	protected override IQueryable<Country> GetQuery() => context.Countries.OrderBy(c => c.Id);

	protected override IQueryable<Country> FilterQuery(IQueryable<Country> query, GetCountriesPageQuery filter) {
		if (filter.Name is not null)
			query = query.Where(c => c.Name.ToLower().Contains(filter.Name.ToLower()));

		return query;
	}
}
