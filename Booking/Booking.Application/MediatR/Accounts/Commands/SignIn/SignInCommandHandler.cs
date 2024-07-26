using Booking.Application.Common.Exceptions;
using Booking.Application.Interfaces;
using Booking.Application.MediatR.Accounts.Commands.Shared;
using Booking.Domain.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Booking.Application.MediatR.Accounts.Commands.SignIn;

public class SignInCommandHandler(
	UserManager<User> userManager,
	IJwtTokenService jwtTokenService
) : IRequestHandler<SignInCommand, JwtTokenVm> {

	public async Task<JwtTokenVm> Handle(SignInCommand request, CancellationToken cancellationToken) {
		User? user = await userManager.FindByEmailAsync(request.Email);

		if (user is null || !await userManager.CheckPasswordAsync(user, request.Password))
			throw new UnauthorizedException("Wrong authentication data");

		return new JwtTokenVm {
			Token = await jwtTokenService.CreateTokenAsync(user)
		};
	}
}
