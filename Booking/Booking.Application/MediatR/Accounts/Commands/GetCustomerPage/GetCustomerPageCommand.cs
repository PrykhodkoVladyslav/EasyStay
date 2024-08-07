using Booking.Application.Models.Pagination;
using MediatR;

namespace Booking.Application.MediatR.Accounts.Commands.GetCustomerPage;

public class GetCustomerPageCommand : PaginationFilterDto, IRequest<PageVm<CustomerItemVm>> {
	public string? FirstName { get; set; }

	public string? LastName { get; set; }
}
