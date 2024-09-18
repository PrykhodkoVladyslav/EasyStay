using Booking.Application.Interfaces;
using Booking.Application.MediatR.Accounts.Commands.Shared;
using Booking.Domain.Constants;
using Booking.Domain.Identity;
using MediatR;

namespace Booking.Application.MediatR.Accounts.Commands.GoogleSignIn;

public class GoogleSignInCommandHandler(
	IJwtTokenService jwtTokenService,
	IAuthService registrationService
) : IRequestHandler<GoogleSignInCommand, JwtTokenVm> {

	public async Task<JwtTokenVm> Handle(GoogleSignInCommand request, CancellationToken cancellationToken) {
		var type = Enum.Parse<RegistrationUserType>(request.Type);

		var createType = type switch {
			RegistrationUserType.Customer => CreateUserType.Customer,
			RegistrationUserType.Realtor => CreateUserType.Realtor,
			_ => throw new Exception("Invalid create type")
		};

		User user = await registrationService.GoogleSignInAsync(request.Credential, createType, cancellationToken);

		return new JwtTokenVm {
			Token = await jwtTokenService.CreateTokenAsync(user)
		};
	}
}
