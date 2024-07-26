using Booking.Application.MediatR.Accounts.Commands.Shared;
using MediatR;

namespace Booking.Application.MediatR.Accounts.Commands.GoogleSignIn;

public class GoogleSignInCommand : IRequest<JwtTokenVm> {
	public string Credential { get; set; } = null!;
}
