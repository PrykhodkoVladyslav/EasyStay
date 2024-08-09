using MediatR;

namespace Booking.Application.MediatR.Accounts.Commands.UnlockUserById;

public class UnlockUserByIdCommand : IRequest {
	public long Id { get; set; }
}
