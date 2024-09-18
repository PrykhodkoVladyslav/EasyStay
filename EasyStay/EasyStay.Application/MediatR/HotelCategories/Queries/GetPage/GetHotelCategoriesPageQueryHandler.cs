using Booking.Application.Interfaces;
using Booking.Application.MediatR.HotelCategories.Queries.Shared;
using Booking.Application.Models.Pagination;
using MediatR;

namespace Booking.Application.MediatR.HotelCategories.Queries.GetPage;

public class GetHotelCategoriesPageQueryHandler(
	IPaginationService<HotelCategoryVm, GetHotelCategoriesPageQuery> pagination
) : IRequestHandler<GetHotelCategoriesPageQuery, PageVm<HotelCategoryVm>> {

	public async Task<PageVm<HotelCategoryVm>> Handle(GetHotelCategoriesPageQuery request, CancellationToken cancellationToken) {
		return await pagination.GetPageAsync(request);
	}
}
