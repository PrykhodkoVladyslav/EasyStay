using Booking.Application.MediatR.Accounts.Commands.Shared;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Booking.Application.MediatR.Accounts.Commands.Update;

public class UpdateCommand : IRequest<JwtTokenVm> {
	public string Email { get; set; } = null!;

	public string FirstName { get; set; } = null!;

	public string LastName { get; set; } = null!;

	public IFormFile Photo { get; set; } = null!;
}
