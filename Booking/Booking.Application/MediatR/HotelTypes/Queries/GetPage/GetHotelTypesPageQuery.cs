using Booking.Application.MediatR.HotelTypes.Queries.Shared;
using Booking.Application.Models.Pagination;
using MediatR;

namespace Booking.Application.MediatR.HotelTypes.Queries.GetPage;

public class GetHotelTypesPageQuery : PaginationFilterDto, IRequest<PageVm<HotelTypeVm>> {
	public string? Name { get; set; }
}
