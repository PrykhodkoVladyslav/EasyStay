using Booking.Application.MediatR.Accounts.Commands.Registration;
using Booking.Application.MediatR.Accounts.Commands.SignIn;
using Booking.WebApi.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace Booking.Controllers;

public class AccountsController : BaseApiController {

	[HttpPost]
	public async Task<IActionResult> SignIn([FromForm] SignInCommand command) {
		var token = await Mediator.Send(command);

		return Ok(token);
	}

	[HttpPost]
	public async Task<IActionResult> Registration([FromForm] RegistrationCommand command) {
		var token = await Mediator.Send(command);

		return Ok(token);
	}
}
