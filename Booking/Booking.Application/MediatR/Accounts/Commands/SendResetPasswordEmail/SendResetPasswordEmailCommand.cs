using MediatR;

namespace Booking.Application.MediatR.Accounts.Commands.SendResetPasswordEmail;

public class SendResetPasswordEmailCommand : IRequest {
	public string Email { get; set; } = null!;
}
