using Booking.Application.MediatR.Accounts.Commands.Shared;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Booking.Application.MediatR.Accounts.Commands.Registration;

public class RegistrationCommand : IRequest<JwtTokenVm> {
	public string FirstName { get; set; } = null!;
	public string LastName { get; set; } = null!;
	public IFormFile Image { get; set; } = null!;

	public string Email { get; set; } = null!;
	public string UserName { get; set; } = null!;
	public string Password { get; set; } = null!;
}
