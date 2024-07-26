using Booking.Application.Interfaces;
using Booking.Application.MediatR.Accounts.Commands.Shared;
using Booking.Domain.Identity;
using MediatR;

namespace Booking.Application.MediatR.Accounts.Commands.GoogleSignIn;

public class GoogleSignInCommandHandler(
	IJwtTokenService jwtTokenService,
	IRegistrationService registrationService
) : IRequestHandler<GoogleSignInCommand, JwtTokenVm> {

	public async Task<JwtTokenVm> Handle(GoogleSignInCommand request, CancellationToken cancellationToken) {
		User user = await registrationService.GoogleSignInAsync(request);

		return new JwtTokenVm {
			Token = await jwtTokenService.CreateTokenAsync(user)
		};
	}
}
