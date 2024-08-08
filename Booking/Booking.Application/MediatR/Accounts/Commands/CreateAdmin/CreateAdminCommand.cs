using AutoMapper;
using Booking.Application.Common.Mappings;
using Booking.Application.Models.Accounts;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Booking.Application.MediatR.Accounts.Commands.CreateAdmin;

public class CreateAdminCommand : IRequest<long>, IMapWith<UserDto> {
	public string FirstName { get; set; } = null!;
	public string LastName { get; set; } = null!;
	public IFormFile Image { get; set; } = null!;

	public string Email { get; set; } = null!;
	public string UserName { get; set; } = null!;
	public string Password { get; set; } = null!;



	public void Mapping(Profile profile) {
		profile.CreateMap<CreateAdminCommand, UserDto>();
	}
}
