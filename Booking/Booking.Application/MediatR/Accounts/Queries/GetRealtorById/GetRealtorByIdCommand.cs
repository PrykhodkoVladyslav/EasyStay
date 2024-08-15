using MediatR;

namespace Booking.Application.MediatR.Accounts.Queries.GetRealtorById;

public class GetRealtorByIdCommand : IRequest<RealtorVm> {
	public long Id { get; set; }
}
