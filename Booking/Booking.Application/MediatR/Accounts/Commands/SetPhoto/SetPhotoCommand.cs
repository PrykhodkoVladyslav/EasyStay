using Booking.Application.MediatR.Accounts.Commands.Shared;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Booking.Application.MediatR.Accounts.Commands.SetPhoto;

public class SetPhotoCommand : IRequest<JwtTokenVm> {
	public IFormFile Photo { get; set; } = null!;
}
