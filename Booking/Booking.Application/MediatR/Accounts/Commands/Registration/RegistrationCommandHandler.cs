using AutoMapper;
using Booking.Application.Interfaces;
using Booking.Application.MediatR.Accounts.Commands.Shared;
using Booking.Application.Models.Accounts;
using Booking.Domain.Constants;
using MediatR;

namespace Booking.Application.MediatR.Accounts.Commands.Registration;

public class RegistrationCommandHandler(
	IJwtTokenService jwtTokenService,
	IAuthService registrationService,
	IMapper mapper
) : IRequestHandler<RegistrationCommand, JwtTokenVm> {

	public async Task<JwtTokenVm> Handle(RegistrationCommand request, CancellationToken cancellationToken) {
		var dto = mapper.Map<UserDto>(request);

		var type = Enum.Parse<RegistrationUserType>(request.Type);

		var createType = type switch {
			RegistrationUserType.Customer => CreateUserType.Customer,
			RegistrationUserType.Realtor => CreateUserType.Realtor,
			_ => throw new Exception("Invalid create type")
		};

		var user = await registrationService.CreateUserAsync(dto, createType, cancellationToken);

		return new JwtTokenVm {
			Token = await jwtTokenService.CreateTokenAsync(user)
		};
	}
}
