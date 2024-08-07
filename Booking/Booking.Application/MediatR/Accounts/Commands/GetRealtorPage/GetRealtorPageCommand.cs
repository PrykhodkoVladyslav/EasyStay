using Booking.Application.Models.Pagination;
using MediatR;

namespace Booking.Application.MediatR.Accounts.Commands.GetRealtorPage;

public class GetRealtorPageCommand : PaginationFilterDto, IRequest<PageVm<RealtorItemVm>> {
	public string? FirstName { get; set; }

	public string? LastName { get; set; }
}
