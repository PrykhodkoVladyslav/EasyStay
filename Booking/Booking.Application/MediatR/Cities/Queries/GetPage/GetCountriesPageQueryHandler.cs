using Booking.Application.Interfaces;
using Booking.Application.MediatR.Cities.Queries.Shared;
using Booking.Application.Models.Pagination;
using MediatR;

namespace Booking.Application.MediatR.Cities.Queries.GetPage;

public class GetCitiesPageQueryHandler(
	IPaginationService<CityVm, GetCitiesPageQuery> pagination
) : IRequestHandler<GetCitiesPageQuery, PageVm<CityVm>> {

	public async Task<PageVm<CityVm>> Handle(GetCitiesPageQuery request, CancellationToken cancellationToken) {
		return await pagination.GetPageAsync(request);
	}
}
