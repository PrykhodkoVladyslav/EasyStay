using Booking.Application.MediatR.HotelCategories.Queries.Shared;
using Booking.Application.Models.Pagination;
using MediatR;

namespace Booking.Application.MediatR.HotelCategories.Queries.GetPage;

public class GetHotelCategoriesPageQuery : PaginationFilterDto, IRequest<PageVm<HotelCategoryVm>> {
	public string? Name { get; set; }
}
