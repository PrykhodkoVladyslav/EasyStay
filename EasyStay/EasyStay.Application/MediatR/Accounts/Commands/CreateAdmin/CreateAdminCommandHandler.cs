using AutoMapper;
using Booking.Application.Interfaces;
using Booking.Application.Models.Accounts;
using Booking.Domain.Constants;
using MediatR;

namespace Booking.Application.MediatR.Accounts.Commands.CreateAdmin;

public class CreateAdminCommandHandler(
	IMapper mapper,
	IAuthService authService
) : IRequestHandler<CreateAdminCommand, long> {

	public async Task<long> Handle(CreateAdminCommand request, CancellationToken cancellationToken) {
		var dto = mapper.Map<UserDto>(request);

		var admin = await authService.CreateUserAsync(dto, CreateUserType.Admin, cancellationToken);

		return admin.Id;
	}
}
