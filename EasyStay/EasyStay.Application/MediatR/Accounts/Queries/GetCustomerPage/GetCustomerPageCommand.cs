using Booking.Application.Models.Pagination;
using MediatR;

namespace Booking.Application.MediatR.Accounts.Queries.GetCustomerPage;

public class GetCustomerPageCommand : PaginationFilterDto, IRequest<PageVm<CustomerItemVm>> {
	public string? FirstName { get; set; }

	public string? LastName { get; set; }

	public bool? IsLocked { get; set; }
}
