using Booking.Application.Interfaces;
using Booking.Application.MediatR.HotelTypes.Queries.Shared;
using Booking.Application.Models.Pagination;
using MediatR;

namespace Booking.Application.MediatR.HotelTypes.Queries.GetPage;

public class GetHotelTypesPageQueryHandler(
	IPaginationService<HotelTypeVm, GetHotelTypesPageQuery> pagination
) : IRequestHandler<GetHotelTypesPageQuery, PageVm<HotelTypeVm>> {

	public async Task<PageVm<HotelTypeVm>> Handle(GetHotelTypesPageQuery request, CancellationToken cancellationToken) {
		return await pagination.GetPageAsync(request);
	}
}
