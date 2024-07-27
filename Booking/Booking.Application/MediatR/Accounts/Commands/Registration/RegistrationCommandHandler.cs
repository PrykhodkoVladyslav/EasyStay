using Booking.Application.Interfaces;
using Booking.Application.MediatR.Accounts.Commands.Shared;
using Booking.Domain.Identity;
using MediatR;

namespace Booking.Application.MediatR.Accounts.Commands.Registration;

public class RegistrationCommandHandler(
	IJwtTokenService jwtTokenService,
	IImageService imageService,
	IAuthService registrationService
) : IRequestHandler<RegistrationCommand, JwtTokenVm> {

	public async Task<JwtTokenVm> Handle(RegistrationCommand request, CancellationToken cancellationToken) {
		var user = new User {
			FirstName = request.FirstName,
			LastName = request.LastName,
			Email = request.Email,
			UserName = request.UserName,
			Photo = await imageService.SaveImageAsync(request.Image)
		};

		try {
			await registrationService.CreateUserAsync(user, request.Password, cancellationToken);
		}
		catch {
			imageService.DeleteImageIfExists(user.Photo);
			throw;
		}

		return new JwtTokenVm {
			Token = await jwtTokenService.CreateTokenAsync(user)
		};
	}
}
