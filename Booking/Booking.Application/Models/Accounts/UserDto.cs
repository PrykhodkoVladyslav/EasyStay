﻿using Microsoft.AspNetCore.Http;

namespace Booking.Application.Models.Accounts;

public class UserDto {
	public string FirstName { get; set; } = null!;
	public string LastName { get; set; } = null!;
	public IFormFile Image { get; set; } = null!;

	public string Email { get; set; } = null!;
	public string UserName { get; set; } = null!;
	public string Password { get; set; } = null!;
}
