using Booking.Application.Interfaces;
using Booking.Application.MediatR.Countries.Queries.GetPage;
using Booking.Application.MediatR.Countries.Queries.Shared;
using Booking.Application.MediatR.Hotels.Queries.Shared;
using Booking.Application.Models.Pagination;
using MediatR;

namespace Booking.Application.MediatR.Hotels.Queries.GetPage;

public class GetCountriesPageQueryHandler(
	IPaginationService<HotelVm, GetHotelsPageQuery> pagination
) : IRequestHandler<GetHotelsPageQuery, PageVm<HotelVm>> {
	public async Task<PageVm<HotelVm>> Handle(GetHotelsPageQuery request, CancellationToken cancellationToken) {
		return await pagination.GetPageAsync(request);
	}
}