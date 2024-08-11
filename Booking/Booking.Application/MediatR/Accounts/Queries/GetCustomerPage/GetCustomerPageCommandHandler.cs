using Booking.Application.Interfaces;
using Booking.Application.Models.Pagination;
using MediatR;

namespace Booking.Application.MediatR.Accounts.Queries.GetCustomerPage;

public class GetCustomerPageCommandHandler(
	IPaginationService<CustomerItemVm, GetCustomerPageCommand> paginationService
) : IRequestHandler<GetCustomerPageCommand, PageVm<CustomerItemVm>> {

	public Task<PageVm<CustomerItemVm>> Handle(GetCustomerPageCommand request, CancellationToken cancellationToken) =>
		paginationService.GetPageAsync(request);
}
