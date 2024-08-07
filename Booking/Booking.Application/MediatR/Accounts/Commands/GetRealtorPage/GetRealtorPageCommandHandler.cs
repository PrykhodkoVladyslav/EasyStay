using Booking.Application.Interfaces;
using Booking.Application.Models.Pagination;
using MediatR;

namespace Booking.Application.MediatR.Accounts.Commands.GetRealtorPage;

public class GetRealtorPageCommandHandler(
	IPaginationService<RealtorItemVm, GetRealtorPageCommand> paginationService
) : IRequestHandler<GetRealtorPageCommand, PageVm<RealtorItemVm>> {

	public Task<PageVm<RealtorItemVm>> Handle(GetRealtorPageCommand request, CancellationToken cancellationToken) =>
		paginationService.GetPageAsync(request);
}
