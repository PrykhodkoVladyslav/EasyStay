using Booking.Application.MediatR.Accounts.Commands.GetCustomerPage;
using Booking.Application.MediatR.Accounts.Commands.GoogleSignIn;
using Booking.Application.MediatR.Accounts.Commands.Registration;
using Booking.Application.MediatR.Accounts.Commands.SignIn;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Booking.WebApi.Controllers;

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

	[HttpPost]
	public async Task<IActionResult> GoogleSignIn([FromForm] GoogleSignInCommand command) {
		var token = await Mediator.Send(command);

		return Ok(token);
	}

	[HttpGet]
	[Authorize(Roles = "Admin")]
	public async Task<IActionResult> GetCustomerPage([FromQuery] GetCustomerPageCommand command) {
		var customers = await Mediator.Send(command);

		return Ok(customers);
	}
}
