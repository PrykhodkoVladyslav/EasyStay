using AutoMapper;
using Booking.Application.Interfaces;
using Booking.Application.MediatR.Countries.Queries.Shared;
using Booking.Application.Models.Pagination;
using MediatR;

namespace Booking.Application.MediatR.Countries.Queries.GetPage;

public class GetCountriesPageQueryHandler(
	IPaginationService<CountryVm, GetCountriesPageQuery> pagination
) : IRequestHandler<GetCountriesPageQuery, PageVm<CountryVm>> {

	public async Task<PageVm<CountryVm>> Handle(GetCountriesPageQuery request, CancellationToken cancellationToken) {
		return await pagination.GetPageAsync(request);
	}
}
